module.exports = {
  myJob: {
    task: async ({ strapi }) => {
      console.log("====================================");
      console.log("Cron job is running");
      console.log("====================================");
      const now = new Date();
      const currentTime = now.toISOString();

      try {
        // Kiểm tra mô hình
        const tripModel = strapi.getModel("api::trip.trip");
        if (!tripModel) {
          throw new Error("Không tìm thấy mô hình chuyến đi");
        }

        // Lấy tất cả các chuyến xe
        const trips = await strapi.entityService.findMany("api::trip.trip");
        console.log("Dữ liệu chuyến đi:", trips); // Kiểm tra cấu trúc dữ liệu

        for (const trip of trips) {
          // Truy cập trực tiếp vào các thuộc tính của trip
          const { id, departureTime, arrivalTime, status } = trip;

          // Kiểm tra các thuộc tính cần thiết
          if (!departureTime || !arrivalTime || !status) {
            console.warn(
              `Chuyến đi với ID ${id} thiếu thuộc tính cần thiết:`,
              trip
            );
            continue; // Bỏ qua nếu thiếu thuộc tính
          }

          // Kiểm tra trạng thái
          if (status === "HỦY") continue;

          // Chuyển đổi thời gian
          const tripDepartureTime = new Date(departureTime).toISOString();
          const tripArrivalTime = new Date(arrivalTime).toISOString();

          // Cập nhật trạng thái dựa trên thời gian
          let newStatus;
          if (tripArrivalTime < currentTime) {
            newStatus = "HẾT HẠN";
          } else if (tripDepartureTime < currentTime) {
            newStatus = "HẾT HẠN";
          } else if (tripDepartureTime > currentTime) {
            newStatus = "HOẠT ĐỘNG";
          } else if (tripDepartureTime === currentTime) {
            newStatus = "KHÔNG HOẠT ĐỘNG";
          }

          // Cập nhật trạng thái chỉ khi cần thiết
          if (status !== newStatus) {
            await strapi.entityService.update("api::trip.trip", id, {
              data: { status: newStatus },
            });
            console.log(`Đã cập nhật trạng thái chuyến đi ID ${id} thành ${newStatus}`);
          }
        }

        console.log("Đã cập nhật trạng thái chuyến đi dựa trên thời gian hiện tại");
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái chuyến đi:", error);
      }
    },
    options: {
      rule: "* * * * *", // Chạy mỗi phút
    },
  },
};

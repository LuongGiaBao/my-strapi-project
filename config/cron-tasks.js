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
          throw new Error("Trip model not found");
        }

        // Lấy tất cả các chuyến xe
        const trips = await strapi.entityService.findMany("api::trip.trip");
        console.log("Trips data:", trips); // Kiểm tra cấu trúc dữ liệu

        for (const trip of trips) {
          // Truy cập trực tiếp vào các thuộc tính của trip
          const { id, departureTime, arrivalTime, status } = trip;

          // Kiểm tra các thuộc tính cần thiết
          if (!departureTime || !arrivalTime || !status) {
            console.warn(
              `Trip with ID ${id} is missing required attributes:`,
              trip
            );
            continue; // Bỏ qua nếu thiếu thuộc tính
          }

          // Kiểm tra trạng thái
          if (status === "CANCELLED") continue;

          // Chuyển đổi thời gian
          const tripDepartureTime = new Date(departureTime).toISOString();
          const tripArrivalTime = new Date(arrivalTime).toISOString();

          // Cập nhật trạng thái dựa trên thời gian
          let newStatus;
          if (tripArrivalTime < currentTime) {
            newStatus = "EXPIRED";
          } else if (tripDepartureTime < currentTime) {
            newStatus = "EXPIRED";
          } else if (tripDepartureTime > currentTime) {
            newStatus = "ACTIVE";
          } else if (tripDepartureTime === currentTime) {
            newStatus = "UNACTIVE";
          }

          // Cập nhật trạng thái chỉ khi cần thiết
          if (status !== newStatus) {
            await strapi.entityService.update("api::trip.trip", id, {
              data: { status: newStatus },
            });
            console.log(`Updated trip ID ${id} status to ${newStatus}`);
          }
        }

        console.log("Updated trip statuses based on current time");
      } catch (error) {
        console.error("Error updating trip statuses:", error);
      }
    },
    options: {
      rule: "* * * * *", // Chạy mỗi phút
    },
  },
};

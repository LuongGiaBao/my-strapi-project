import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    tickets: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::ticket.ticket'
    >;
    payments: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::payment.payment'
    >;
    phone: Attribute.String;
    fullName: Attribute.String;
    invoices: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::invoice.invoice'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusBus extends Schema.CollectionType {
  collectionName: 'buses';
  info: {
    singularName: 'bus';
    pluralName: 'buses';
    displayName: 'Bus';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BienSo: Attribute.String & Attribute.Required & Attribute.DefaultTo<'BS'>;
    seatCount: Attribute.Integer;
    status: Attribute.Enumeration<
      ['Ho\u1EA1t \u0111\u1ED9ng', 'Kh\u00F4ng ho\u1EA1t \u0111\u1ED9ng']
    >;
    busName: Attribute.String & Attribute.Required;
    schedules: Attribute.Relation<
      'api::bus.bus',
      'oneToMany',
      'api::schedule.schedule'
    >;
    MaXe: Attribute.String & Attribute.Required & Attribute.DefaultTo<'MX'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::bus.bus', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::bus.bus', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCustomerCustomer extends Schema.CollectionType {
  collectionName: 'customers';
  info: {
    singularName: 'customer';
    pluralName: 'customers';
    displayName: 'Customer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MaKH: Attribute.String & Attribute.Required & Attribute.DefaultTo<'MKH'>;
    TenKH: Attribute.String & Attribute.Required;
    Email: Attribute.String;
    DienThoai: Attribute.Integer;
    DiaChi: Attribute.String;
    GioiTinh: Attribute.Enumeration<['Nam', 'N\u1EEF']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDetaiPriceDetaiPrice extends Schema.CollectionType {
  collectionName: 'detai_prices';
  info: {
    singularName: 'detai-price';
    pluralName: 'detai-prices';
    displayName: 'DetaiPrice';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MaChiTietGia: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'MCTG'>;
    Gia: Attribute.String & Attribute.Required;
    trip: Attribute.Relation<
      'api::detai-price.detai-price',
      'manyToOne',
      'api::trip.trip'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::detai-price.detai-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::detai-price.detai-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDetailPromotionDetailPromotion
  extends Schema.CollectionType {
  collectionName: 'detail_promotions';
  info: {
    singularName: 'detail-promotion';
    pluralName: 'detail-promotions';
    displayName: 'DetailPromotion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MaChiTietKhuyenMai: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'MCTKM'>;
    promotion: Attribute.Relation<
      'api::detail-promotion.detail-promotion',
      'manyToOne',
      'api::promotion.promotion'
    >;
    trip: Attribute.Relation<
      'api::detail-promotion.detail-promotion',
      'manyToOne',
      'api::trip.trip'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::detail-promotion.detail-promotion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::detail-promotion.detail-promotion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropOffPointDropOffPoint extends Schema.CollectionType {
  collectionName: 'drop_off_points';
  info: {
    singularName: 'drop-off-point';
    pluralName: 'drop-off-points';
    displayName: 'DropOffPoint';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    location: Attribute.String & Attribute.Required;
    address: Attribute.String & Attribute.Required;
    MaTuyen: Attribute.Relation<
      'api::drop-off-point.drop-off-point',
      'oneToMany',
      'api::trip.trip'
    >;
    MaDiemTra: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'MDP'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::drop-off-point.drop-off-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::drop-off-point.drop-off-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Schema.CollectionType {
  collectionName: 'invoices';
  info: {
    singularName: 'invoice';
    pluralName: 'invoices';
    displayName: 'Invoice';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    totalAmount: Attribute.Decimal & Attribute.Required;
    status: Attribute.Enumeration<
      ['ho\u00E0n th\u00E0nh', '\u0111ang x\u1EED l\u00FD', 'h\u1EE7y']
    >;
    transactionId: Attribute.String;
    paidAt: Attribute.DateTime;
    notes: Attribute.String;
    payment: Attribute.Relation<
      'api::invoice.invoice',
      'manyToOne',
      'api::payment.payment'
    >;
    users_permissions_user: Attribute.Relation<
      'api::invoice.invoice',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    trip: Attribute.Relation<
      'api::invoice.invoice',
      'manyToOne',
      'api::trip.trip'
    >;
    seats: Attribute.Relation<
      'api::invoice.invoice',
      'manyToMany',
      'api::seat.seat'
    >;
    invoiceNumber: Attribute.String & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationLocation extends Schema.CollectionType {
  collectionName: 'locations';
  info: {
    singularName: 'location';
    pluralName: 'locations';
    displayName: ' Location';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    trips: Attribute.Relation<
      'api::location.location',
      'oneToMany',
      'api::trip.trip'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location.location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::location.location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentPayment extends Schema.CollectionType {
  collectionName: 'payments';
  info: {
    singularName: 'payment';
    pluralName: 'payments';
    displayName: 'Payment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amount: Attribute.Decimal;
    paymentMethod: Attribute.Enumeration<['credit_card', 'paypal', 'cash']>;
    status: Attribute.Enumeration<['completed', 'pending', 'failed']>;
    ticket: Attribute.Relation<
      'api::payment.payment',
      'manyToOne',
      'api::ticket.ticket'
    >;
    users_permissions_user: Attribute.Relation<
      'api::payment.payment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    invoices: Attribute.Relation<
      'api::payment.payment',
      'oneToMany',
      'api::invoice.invoice'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPickupPointPickupPoint extends Schema.CollectionType {
  collectionName: 'pickup_points';
  info: {
    singularName: 'pickup-point';
    pluralName: 'pickup-points';
    displayName: 'PickupPoint';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    location: Attribute.String & Attribute.Required;
    address: Attribute.String & Attribute.Required;
    MaTuyen: Attribute.Relation<
      'api::pickup-point.pickup-point',
      'oneToMany',
      'api::trip.trip'
    >;
    MaDiemDon: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'MPP'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pickup-point.pickup-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::pickup-point.pickup-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPromotionPromotion extends Schema.CollectionType {
  collectionName: 'promotions';
  info: {
    singularName: 'promotion';
    pluralName: 'promotions';
    displayName: 'Promotion';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    promotionName: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    discountType: Attribute.Enumeration<
      ['T\u1EB7ng ti\u1EC1n', 'Chi\u1EBFt kh\u1EA5u h\u00F3a \u0111\u01A1n']
    > &
      Attribute.Required;
    discountValue: Attribute.Decimal;
    startDate: Attribute.DateTime;
    endDate: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['Ho\u1EA1t \u0111\u1ED9ng', 'Kh\u00F4ng ho\u1EA1t \u0111\u1ED9ng']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Ho\u1EA1t \u0111\u1ED9ng'>;
    IDPromotion: Attribute.String & Attribute.DefaultTo<'MK'>;
    detail_promotions: Attribute.Relation<
      'api::promotion.promotion',
      'oneToMany',
      'api::detail-promotion.detail-promotion'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::promotion.promotion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::promotion.promotion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiScheduleSchedule extends Schema.CollectionType {
  collectionName: 'schedules';
  info: {
    singularName: 'schedule';
    pluralName: 'schedules';
    displayName: 'Schedule';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    IDSchedule: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'ML'>;
    ngaydi: Attribute.DateTime & Attribute.Required;
    ngayden: Attribute.DateTime;
    MaTuyen: Attribute.Relation<
      'api::schedule.schedule',
      'manyToOne',
      'api::trip.trip'
    >;
    BienSo: Attribute.Relation<
      'api::schedule.schedule',
      'manyToOne',
      'api::bus.bus'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::schedule.schedule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::schedule.schedule',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSeatSeat extends Schema.CollectionType {
  collectionName: 'seats';
  info: {
    singularName: 'seat';
    pluralName: 'seats';
    displayName: 'Seat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seatNumber: Attribute.Integer & Attribute.Required & Attribute.Unique;
    status: Attribute.Enumeration<
      ['c\u00F2n tr\u1ED1ng', '\u0111ang ch\u1ECDn', '\u0111\u00E3 b\u00E1n']
    >;
    tickets: Attribute.Relation<
      'api::seat.seat',
      'oneToMany',
      'api::ticket.ticket'
    >;
    trip: Attribute.Relation<'api::seat.seat', 'manyToOne', 'api::trip.trip'>;
    invoices: Attribute.Relation<
      'api::seat.seat',
      'manyToMany',
      'api::invoice.invoice'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::seat.seat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::seat.seat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTicketTicket extends Schema.CollectionType {
  collectionName: 'tickets';
  info: {
    singularName: 'ticket';
    pluralName: 'tickets';
    displayName: 'Ticket';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    status: Attribute.Enumeration<
      [
        'C\u00F3 s\u1EB5n',
        '\u0110\u00E3 b\u00E1n',
        '\u0110\u00E3 \u0111\u1EB7t tr\u01B0\u1EDBc'
      ]
    >;
    seat: Attribute.Relation<
      'api::ticket.ticket',
      'manyToOne',
      'api::seat.seat'
    >;
    users_permissions_user: Attribute.Relation<
      'api::ticket.ticket',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    payments: Attribute.Relation<
      'api::ticket.ticket',
      'oneToMany',
      'api::payment.payment'
    >;
    trips: Attribute.Relation<
      'api::ticket.ticket',
      'oneToMany',
      'api::trip.trip'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTicketPriceTicketPrice extends Schema.CollectionType {
  collectionName: 'ticket_prices';
  info: {
    singularName: 'ticket-price';
    pluralName: 'ticket-prices';
    displayName: 'TicketPrice';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    startDate: Attribute.DateTime;
    endDate: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['Ho\u1EA1t \u0111\u1ED9ng', 'Kh\u00F4ng ho\u1EA1t \u0111\u1ED9ng']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Kh\u00F4ng ho\u1EA1t \u0111\u1ED9ng'>;
    MaGia: Attribute.String & Attribute.Required & Attribute.DefaultTo<'MG'>;
    Mota: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket-price.ticket-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket-price.ticket-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTripTrip extends Schema.CollectionType {
  collectionName: 'trips';
  info: {
    singularName: 'trip';
    pluralName: 'trips';
    displayName: 'Trip';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ticket: Attribute.Relation<
      'api::trip.trip',
      'manyToOne',
      'api::ticket.ticket'
    >;
    seats: Attribute.Relation<'api::trip.trip', 'oneToMany', 'api::seat.seat'>;
    status: Attribute.Enumeration<
      ['Ho\u1EA1t \u0111\u1ED9ng', 'Ng\u01B0ng ho\u1EA1t \u0111\u1ED9ng']
    > &
      Attribute.Required;
    totalSeats: Attribute.Integer & Attribute.DefaultTo<34>;
    invoices: Attribute.Relation<
      'api::trip.trip',
      'oneToMany',
      'api::invoice.invoice'
    >;
    ExpectedTime: Attribute.Time & Attribute.Required;
    detail_promotions: Attribute.Relation<
      'api::trip.trip',
      'oneToMany',
      'api::detail-promotion.detail-promotion'
    >;
    MaTuyen: Attribute.String & Attribute.Required & Attribute.DefaultTo<'MT'>;
    schedules: Attribute.Relation<
      'api::trip.trip',
      'oneToMany',
      'api::schedule.schedule'
    >;
    detai_prices: Attribute.Relation<
      'api::trip.trip',
      'oneToMany',
      'api::detai-price.detai-price'
    >;
    MaDiemDon: Attribute.Relation<
      'api::trip.trip',
      'manyToOne',
      'api::pickup-point.pickup-point'
    >;
    MaDiemTra: Attribute.Relation<
      'api::trip.trip',
      'manyToOne',
      'api::drop-off-point.drop-off-point'
    >;
    departure_location_id: Attribute.Relation<
      'api::trip.trip',
      'manyToOne',
      'api::location.location'
    >;
    arrival_location_id: Attribute.Relation<
      'api::trip.trip',
      'manyToOne',
      'api::location.location'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::trip.trip', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::trip.trip', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::bus.bus': ApiBusBus;
      'api::customer.customer': ApiCustomerCustomer;
      'api::detai-price.detai-price': ApiDetaiPriceDetaiPrice;
      'api::detail-promotion.detail-promotion': ApiDetailPromotionDetailPromotion;
      'api::drop-off-point.drop-off-point': ApiDropOffPointDropOffPoint;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::location.location': ApiLocationLocation;
      'api::payment.payment': ApiPaymentPayment;
      'api::pickup-point.pickup-point': ApiPickupPointPickupPoint;
      'api::promotion.promotion': ApiPromotionPromotion;
      'api::schedule.schedule': ApiScheduleSchedule;
      'api::seat.seat': ApiSeatSeat;
      'api::ticket.ticket': ApiTicketTicket;
      'api::ticket-price.ticket-price': ApiTicketPriceTicketPrice;
      'api::trip.trip': ApiTripTrip;
    }
  }
}

// @ts-nocheck
import { Prisma } from './prisma-types';

// Tipagem gerada automaticamente: Endpoints apenas

export type Endpoints = {
  "/api/private/auth/code": {
    "method": "PUT";
    "params": {
      "code": string;
    };
  };
  "/api/private/auth/confirm": {
    "method": "GET";
  };
  "/api/private/auth/hidrate": {
    "method": "GET";
  };
  "/api/private/auth/need_reset": {
    "method": "POST";
    "body": {
      "password": string;
      "password_confirm": string;
    };
  };
  "/api/private/auth/reset": {
    "method": "POST";
    "body": {
      "current_password": string;
      "password": string;
      "password_confirm": string;
    };
  };
  "/api/private/billing/checkout": {
    "method": "POST";
    "params": {
      "price_id": string;
    };
  };
  "/api/private/billing/test": {
    "method": "POST";
    "params": {
      "test": string;
    };
  };
  "/api/private/billing/webhook": {
    "method": "POST";
  };
  "/api/private/chat/category": {
    "method": "GET";
  };
  "/api/private/chat/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.chatSelect;
      "include"?: Prisma.chatInclude;
    };
  };
  "/api/private/chat/messages": {
    "method": "POST";
    "body": {
      "chat"?: string;
      "features": string;
      "question": string;
    };
  };
  "/api/private/chat/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
  };
  "/api/private/client_address/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.client_addressSelect;
      "include"?: Prisma.client_addressInclude;
    };
    "body": {
      "city"?: string;
      "client_id": string;
      "complement"?: string;
      "country"?: string;
      "neighborhood"?: string;
      "number"?: string;
      "state"?: string;
      "street"?: string;
      "zip_code"?: string;
    };
  };
  "/api/private/client_address/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_addressSelect;
      "include"?: Prisma.client_addressInclude;
    };
    "body": {
      "city"?: string;
      "client_id"?: string;
      "complement"?: string;
      "country"?: string;
      "neighborhood"?: string;
      "number"?: string;
      "state"?: string;
      "street"?: string;
      "zip_code"?: string;
    };
  };
  "/api/private/client_bank_account/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_bank_accountSelect;
      "include"?: Prisma.client_bank_accountInclude;
      "return"?: string;
      "client_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/client_bank_account/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.client_bank_accountSelect;
      "include"?: Prisma.client_bank_accountInclude;
      "client_id"?: string;
    };
  };
  "/api/private/client_bank_account/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_bank_accountSelect;
      "include"?: Prisma.client_bank_accountInclude;
      "return"?: string;
      "client_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/client_bank_account/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.client_bank_accountSelect;
      "include"?: Prisma.client_bank_accountInclude;
      "return"?: string;
      "client_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "account": string;
      "agency": string;
      "bank_name"?: string;
      "bank_number"?: string;
      "client_id": string;
      "comment"?: string;
      "country": string;
      "digit"?: string;
      "principal"?: string;
      "type": string;
    };
  };
  "/api/private/client_bank_account/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.client_bank_accountSelect;
      "include"?: Prisma.client_bank_accountInclude;
      "client_id"?: string;
    };
  };
  "/api/private/client_bank_account/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_bank_accountSelect;
      "include"?: Prisma.client_bank_accountInclude;
      "return"?: string;
      "client_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "account"?: string;
      "agency"?: string;
      "bank_name"?: string;
      "bank_number"?: string;
      "client_id"?: string;
      "comment"?: string;
      "country"?: string;
      "digit"?: string;
      "principal"?: string;
      "type"?: string;
    };
  };
  "/api/private/client_contact/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_contactSelect;
      "include"?: Prisma.client_contactInclude;
    };
  };
  "/api/private/client_contact/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_contactSelect;
      "include"?: Prisma.client_contactInclude;
    };
  };
  "/api/private/client_contact/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.client_contactSelect;
      "include"?: Prisma.client_contactInclude;
    };
    "body": {
      "client_id": string;
      "createdAt"?: string;
      "register": string;
      "type": string;
    };
  };
  "/api/private/client_contact/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.client_contactSelect;
      "include"?: Prisma.client_contactInclude;
      "client_id"?: string;
    };
  };
  "/api/private/client_contact/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_contactSelect;
      "include"?: Prisma.client_contactInclude;
    };
    "body": {
      "client_id"?: string;
      "register"?: string;
      "type"?: string;
    };
  };
  "/api/private/client_document/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_documentSelect;
      "include"?: Prisma.client_documentInclude;
    };
  };
  "/api/private/client_document/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_documentSelect;
      "include"?: Prisma.client_documentInclude;
    };
  };
  "/api/private/client_document/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.client_documentSelect;
      "include"?: Prisma.client_documentInclude;
    };
    "body": {
      "client_id": string;
      "createdAt"?: string;
      "register": string;
      "type": string;
    };
  };
  "/api/private/client_document/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.client_documentSelect;
      "include"?: Prisma.client_documentInclude;
      "client_id"?: string;
    };
  };
  "/api/private/client_document/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_documentSelect;
      "include"?: Prisma.client_documentInclude;
    };
    "body": {
      "client_id"?: string;
      "register"?: string;
      "type"?: string;
    };
  };
  "/api/private/client_file/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_fileSelect;
      "include"?: Prisma.client_fileInclude;
    };
  };
  "/api/private/client_file/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.client_fileSelect;
      "include"?: Prisma.client_fileInclude;
    };
    "body": {
      "client_id": string;
      "file"?: any;
    };
  };
  "/api/private/client_file/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.client_fileSelect;
      "include"?: Prisma.client_fileInclude;
    };
    "body": {
      "name"?: string;
    };
  };
  "/api/private/client/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/client/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
    };
  };
  "/api/private/client/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/client/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/client/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
    };
  };
  "/api/private/client/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "avatar"?: any;
      "comment"?: string;
      "email"?: string;
      "name": string;
      "phone"?: string;
    };
  };
  "/api/private/client/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
    };
  };
  "/api/private/client/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "avatar"?: any;
      "comment"?: string;
      "email"?: string;
      "name"?: string;
      "phone"?: string;
    };
  };
  "/api/private/company_address/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.company_addressSelect;
      "include"?: Prisma.company_addressInclude;
    };
    "body": {
      "city"?: string;
      "company_id": string;
      "complement"?: string;
      "country"?: string;
      "neighborhood"?: string;
      "number"?: string;
      "state"?: string;
      "street"?: string;
      "zip_code"?: string;
    };
  };
  "/api/private/company_address/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_addressSelect;
      "include"?: Prisma.company_addressInclude;
    };
    "body": {
      "city"?: string;
      "company_id"?: string;
      "complement"?: string;
      "country"?: string;
      "neighborhood"?: string;
      "number"?: string;
      "state"?: string;
      "street"?: string;
      "zip_code"?: string;
    };
  };
  "/api/private/company_config/show": {
    "method": "GET";
    "query"?: {
      "select"?: Prisma.company_configSelect;
      "include"?: Prisma.company_configInclude;
    };
  };
  "/api/private/company_config/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.company_configSelect;
      "include"?: Prisma.company_configInclude;
    };
    "body": {
      "total_hour_day": string;
      "util_hour_day": string;
    };
  };
  "/api/private/company_config/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_configSelect;
      "include"?: Prisma.company_configInclude;
    };
    "body": {
      "total_hour_day"?: string;
      "util_hour_day"?: string;
    };
  };
  "/api/private/company_contact/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_contactSelect;
      "include"?: Prisma.company_contactInclude;
    };
  };
  "/api/private/company_contact/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_contactSelect;
      "include"?: Prisma.company_contactInclude;
    };
  };
  "/api/private/company_contact/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.company_contactSelect;
      "include"?: Prisma.company_contactInclude;
    };
    "body": {
      "company_id": string;
      "createdAt"?: string;
      "register": string;
      "type": string;
    };
  };
  "/api/private/company_contact/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.company_contactSelect;
      "include"?: Prisma.company_contactInclude;
      "company_id"?: string;
    };
  };
  "/api/private/company_contact/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_contactSelect;
      "include"?: Prisma.company_contactInclude;
    };
    "body": {
      "company_id"?: string;
      "register"?: string;
      "type"?: string;
    };
  };
  "/api/private/company_document/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_documentSelect;
      "include"?: Prisma.company_documentInclude;
    };
  };
  "/api/private/company_document/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_documentSelect;
      "include"?: Prisma.company_documentInclude;
    };
  };
  "/api/private/company_document/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.company_documentSelect;
      "include"?: Prisma.company_documentInclude;
    };
    "body": {
      "company_id": string;
      "createdAt"?: string;
      "register": string;
      "type": string;
    };
  };
  "/api/private/company_document/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.company_documentSelect;
      "include"?: Prisma.company_documentInclude;
      "company_id"?: string;
    };
  };
  "/api/private/company_document/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_documentSelect;
      "include"?: Prisma.company_documentInclude;
    };
    "body": {
      "company_id"?: string;
      "register"?: string;
      "type"?: string;
    };
  };
  "/api/private/company_file/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_fileSelect;
      "include"?: Prisma.company_fileInclude;
    };
  };
  "/api/private/company_file/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.company_fileSelect;
      "include"?: Prisma.company_fileInclude;
    };
    "body": {
      "company_id": string;
      "file"?: any;
    };
  };
  "/api/private/company_file/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.company_fileSelect;
      "include"?: Prisma.company_fileInclude;
    };
    "body": {
      "name"?: string;
    };
  };
  "/api/private/company/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.companySelect;
      "include"?: Prisma.companyInclude;
    };
  };
  "/api/private/company/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.companySelect;
      "include"?: Prisma.companyInclude;
    };
    "body": {
      "email": string;
      "entity": string;
      "logo"?: any;
      "name": string;
      "phone": string;
      "type": string;
    };
  };
  "/api/private/company/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.companySelect;
      "include"?: Prisma.companyInclude;
    };
    "body": {
      "email"?: string;
      "logo"?: any;
      "name"?: string;
      "phone"?: string;
    };
  };
  "/api/private/cost_center/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.cost_centerSelect;
      "include"?: Prisma.cost_centerInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/cost_center/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.cost_centerSelect;
      "include"?: Prisma.cost_centerInclude;
    };
  };
  "/api/private/cost_center/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.cost_centerSelect;
      "include"?: Prisma.cost_centerInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/cost_center/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.cost_centerSelect;
      "include"?: Prisma.cost_centerInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/cost_center/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.cost_centerSelect;
      "include"?: Prisma.cost_centerInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "title": string;
    };
  };
  "/api/private/cost_center/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.cost_centerSelect;
      "include"?: Prisma.cost_centerInclude;
    };
  };
  "/api/private/cost_center/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.cost_centerSelect;
      "include"?: Prisma.cost_centerInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "title"?: string;
    };
  };
  "/api/private/dashboard/index": {
    "method": "GET";
    "query"?: {
      "project_id"?: string;
      "project_version_id"?: string;
      "work_type_id"?: string;
      "cost_center_id"?: string;
      "owner_id"?: string;
      "start_date"?: string;
      "end_date"?: string;
      "export"?: string;
      "convert_currency"?: string;
    };
  };
  "/api/private/integration_action/update": {
    "method": "POST";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.integration_actionSelect;
      "include"?: Prisma.integration_actionInclude;
    };
    "body": {
      "actions": string;
      "module_id": string;
    };
  };
  "/api/private/integration/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/integration/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
    };
  };
  "/api/private/integration/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/integration/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/integration/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
    };
  };
  "/api/private/integration/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "expire_in"?: string;
      "name": string;
    };
  };
  "/api/private/integration/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
    };
  };
  "/api/private/integration/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.integrationSelect;
      "include"?: Prisma.integrationInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "expire_in"?: string;
      "name"?: string;
    };
  };
  "/api/private/invite/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/invite/feedback": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
    };
    "body": {
      "accepted"?: string;
    };
  };
  "/api/private/invite/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
    };
  };
  "/api/private/invite/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/invite/me": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
    };
  };
  "/api/private/invite/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/invite/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "email": string;
      "expire_date"?: string;
      "level_id": string;
    };
  };
  "/api/private/invite/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
    };
  };
  "/api/private/invite/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.inviteSelect;
      "include"?: Prisma.inviteInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "accepted"?: string;
      "expire_date"?: string;
      "feedback_in"?: string;
      "level_id"?: string;
    };
  };
  "/api/private/kanban_template_card_type/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_card_typeSelect;
      "include"?: Prisma.kanban_template_card_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/kanban_template_card_type/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_template_card_typeSelect;
      "include"?: Prisma.kanban_template_card_typeInclude;
    };
  };
  "/api/private/kanban_template_card_type/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_card_typeSelect;
      "include"?: Prisma.kanban_template_card_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/kanban_template_card_type/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_card_typeSelect;
      "include"?: Prisma.kanban_template_card_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/kanban_template_card_type/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.kanban_template_card_typeSelect;
      "include"?: Prisma.kanban_template_card_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "color": string;
      "icon": string;
      "principal"?: string;
      "problem"?: string;
      "title": string;
    };
  };
  "/api/private/kanban_template_card_type/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_template_card_typeSelect;
      "include"?: Prisma.kanban_template_card_typeInclude;
    };
  };
  "/api/private/kanban_template_card_type/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_card_typeSelect;
      "include"?: Prisma.kanban_template_card_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "color"?: string;
      "icon"?: string;
      "principal"?: string;
      "problem"?: string;
      "title"?: string;
    };
  };
  "/api/private/kanban_template_card/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_cardSelect;
      "include"?: Prisma.kanban_template_cardInclude;
    };
  };
  "/api/private/kanban_template_card/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_cardSelect;
      "include"?: Prisma.kanban_template_cardInclude;
    };
  };
  "/api/private/kanban_template_card/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.kanban_template_cardSelect;
      "include"?: Prisma.kanban_template_cardInclude;
    };
    "body": {
      "createdAt"?: string;
      "kanban_template_card_type_id": string;
      "kanban_template_id": string;
    };
  };
  "/api/private/kanban_template_card/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_template_cardSelect;
      "include"?: Prisma.kanban_template_cardInclude;
      "kanban_template_id"?: string;
    };
  };
  "/api/private/kanban_template_column/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_columnSelect;
      "include"?: Prisma.kanban_template_columnInclude;
    };
  };
  "/api/private/kanban_template_column/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_template_columnSelect;
      "include"?: Prisma.kanban_template_columnInclude;
    };
  };
  "/api/private/kanban_template_column/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_columnSelect;
      "include"?: Prisma.kanban_template_columnInclude;
    };
    "body": {
      "data": any[];
    };
  };
  "/api/private/kanban_template_column/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_columnSelect;
      "include"?: Prisma.kanban_template_columnInclude;
    };
  };
  "/api/private/kanban_template_column/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.kanban_template_columnSelect;
      "include"?: Prisma.kanban_template_columnInclude;
    };
    "body": {
      "color"?: string;
      "createdAt"?: string;
      "description"?: string;
      "finished"?: string;
      "kanban_template_id": string;
      "limit"?: string;
      "order": string;
      "title": string;
    };
  };
  "/api/private/kanban_template_column/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_template_columnSelect;
      "include"?: Prisma.kanban_template_columnInclude;
      "kanban_template_id"?: string;
    };
  };
  "/api/private/kanban_template_column/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_columnSelect;
      "include"?: Prisma.kanban_template_columnInclude;
    };
    "body": {
      "color"?: string;
      "description"?: string;
      "finished"?: string;
      "kanban_template_id"?: string;
      "limit"?: string;
      "order"?: string;
      "title"?: string;
    };
  };
  "/api/private/kanban_template_tag/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_tagSelect;
      "include"?: Prisma.kanban_template_tagInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/kanban_template_tag/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_template_tagSelect;
      "include"?: Prisma.kanban_template_tagInclude;
    };
  };
  "/api/private/kanban_template_tag/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_tagSelect;
      "include"?: Prisma.kanban_template_tagInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/kanban_template_tag/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_tagSelect;
      "include"?: Prisma.kanban_template_tagInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/kanban_template_tag/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.kanban_template_tagSelect;
      "include"?: Prisma.kanban_template_tagInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "title": string;
    };
  };
  "/api/private/kanban_template_tag/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_template_tagSelect;
      "include"?: Prisma.kanban_template_tagInclude;
    };
  };
  "/api/private/kanban_template_tag/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_template_tagSelect;
      "include"?: Prisma.kanban_template_tagInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "title"?: string;
    };
  };
  "/api/private/kanban_template/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/kanban_template/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
    };
  };
  "/api/private/kanban_template/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/kanban_template/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/kanban_template/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
    };
  };
  "/api/private/kanban_template/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "template_id"?: string;
      "title"?: string;
    };
  };
  "/api/private/kanban_template/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
    };
  };
  "/api/private/kanban_template/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.kanban_templateSelect;
      "include"?: Prisma.kanban_templateInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "title"?: string;
    };
  };
  "/api/private/level_action/update": {
    "method": "POST";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.level_actionSelect;
      "include"?: Prisma.level_actionInclude;
    };
    "body": {
      "actions": string;
      "module_id": string;
    };
  };
  "/api/private/level/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/level/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
    };
  };
  "/api/private/level/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/level/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/level/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
    };
  };
  "/api/private/level/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "description"?: string;
      "title": string;
    };
  };
  "/api/private/level/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
    };
  };
  "/api/private/level/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.levelSelect;
      "include"?: Prisma.levelInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "description"?: string;
      "title"?: string;
    };
  };
  "/api/private/me/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
  };
  "/api/private/module/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.moduleSelect;
      "include"?: Prisma.moduleInclude;
    };
  };
  "/api/private/notification_subscription/key": {
    "method": "GET";
  };
  "/api/private/notification_subscription/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.notification_subscriptionSelect;
      "include"?: Prisma.notification_subscriptionInclude;
    };
    "body": {
      "force"?: string;
      "subscription": string;
    };
  };
  "/api/private/notification/clean": {
    "method": "POST";
  };
  "/api/private/notification/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.notificationSelect;
      "include"?: Prisma.notificationInclude;
    };
  };
  "/api/private/notification/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.notificationSelect;
      "include"?: Prisma.notificationInclude;
    };
    "body": {
      "read": string;
    };
  };
  "/api/private/plan/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.planSelect;
      "include"?: Prisma.planInclude;
    };
  };
  "/api/private/profile_address/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profile_addressSelect;
      "include"?: Prisma.profile_addressInclude;
    };
    "body": {
      "city"?: string;
      "complement"?: string;
      "country"?: string;
      "neighborhood"?: string;
      "number"?: string;
      "profile_id": string;
      "state"?: string;
      "street"?: string;
      "zip_code"?: string;
    };
  };
  "/api/private/profile_address/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_addressSelect;
      "include"?: Prisma.profile_addressInclude;
    };
    "body": {
      "city"?: string;
      "complement"?: string;
      "country"?: string;
      "neighborhood"?: string;
      "number"?: string;
      "profile_id"?: string;
      "state"?: string;
      "street"?: string;
      "zip_code"?: string;
    };
  };
  "/api/private/profile_bank_account/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_bank_accountSelect;
      "include"?: Prisma.profile_bank_accountInclude;
      "return"?: string;
      "profile_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/profile_bank_account/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profile_bank_accountSelect;
      "include"?: Prisma.profile_bank_accountInclude;
      "profile_id"?: string;
    };
  };
  "/api/private/profile_bank_account/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_bank_accountSelect;
      "include"?: Prisma.profile_bank_accountInclude;
      "return"?: string;
      "profile_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/profile_bank_account/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profile_bank_accountSelect;
      "include"?: Prisma.profile_bank_accountInclude;
      "return"?: string;
      "profile_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "account": string;
      "agency": string;
      "bank_name"?: string;
      "bank_number"?: string;
      "comment"?: string;
      "country": string;
      "digit"?: string;
      "principal"?: string;
      "profile_id": string;
      "type": string;
    };
  };
  "/api/private/profile_bank_account/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profile_bank_accountSelect;
      "include"?: Prisma.profile_bank_accountInclude;
      "profile_id"?: string;
    };
  };
  "/api/private/profile_bank_account/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_bank_accountSelect;
      "include"?: Prisma.profile_bank_accountInclude;
      "return"?: string;
      "profile_id"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "account"?: string;
      "agency"?: string;
      "bank_name"?: string;
      "bank_number"?: string;
      "comment"?: string;
      "country"?: string;
      "digit"?: string;
      "principal"?: string;
      "profile_id"?: string;
      "type"?: string;
    };
  };
  "/api/private/profile_bonus/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_bonusSelect;
      "include"?: Prisma.profile_bonusInclude;
    };
  };
  "/api/private/profile_bonus/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_bonusSelect;
      "include"?: Prisma.profile_bonusInclude;
    };
  };
  "/api/private/profile_bonus/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profile_bonusSelect;
      "include"?: Prisma.profile_bonusInclude;
    };
    "body": {
      "active"?: string;
      "cost_center_id"?: string;
      "createdAt"?: string;
      "currency": string;
      "end_date"?: string;
      "pay": string;
      "payment_routine": string;
      "pro_rata"?: string;
      "profile_id": string;
      "recurrence": string;
      "start_date": string;
      "title": string;
      "type": string;
    };
  };
  "/api/private/profile_bonus/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profile_bonusSelect;
      "include"?: Prisma.profile_bonusInclude;
      "profile_id"?: string;
    };
  };
  "/api/private/profile_bonus/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_bonusSelect;
      "include"?: Prisma.profile_bonusInclude;
    };
    "body": {
      "active"?: string;
      "cost_center_id"?: string;
      "currency"?: string;
      "end_date"?: string;
      "pay"?: string;
      "payment_routine"?: string;
      "pro_rata"?: string;
      "profile_id"?: string;
      "recurrence"?: string;
      "start_date"?: string;
      "title"?: string;
      "type"?: string;
    };
  };
  "/api/private/profile_contact/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_contactSelect;
      "include"?: Prisma.profile_contactInclude;
    };
  };
  "/api/private/profile_contact/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_contactSelect;
      "include"?: Prisma.profile_contactInclude;
    };
  };
  "/api/private/profile_contact/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profile_contactSelect;
      "include"?: Prisma.profile_contactInclude;
    };
    "body": {
      "createdAt"?: string;
      "profile_id": string;
      "register": string;
      "type": string;
    };
  };
  "/api/private/profile_contact/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profile_contactSelect;
      "include"?: Prisma.profile_contactInclude;
      "profile_id"?: string;
    };
  };
  "/api/private/profile_contact/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_contactSelect;
      "include"?: Prisma.profile_contactInclude;
    };
    "body": {
      "profile_id"?: string;
      "register"?: string;
      "type"?: string;
    };
  };
  "/api/private/profile_document/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_documentSelect;
      "include"?: Prisma.profile_documentInclude;
    };
  };
  "/api/private/profile_document/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_documentSelect;
      "include"?: Prisma.profile_documentInclude;
    };
  };
  "/api/private/profile_document/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profile_documentSelect;
      "include"?: Prisma.profile_documentInclude;
    };
    "body": {
      "createdAt"?: string;
      "profile_id": string;
      "register": string;
      "type": string;
    };
  };
  "/api/private/profile_document/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profile_documentSelect;
      "include"?: Prisma.profile_documentInclude;
      "profile_id"?: string;
    };
  };
  "/api/private/profile_document/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_documentSelect;
      "include"?: Prisma.profile_documentInclude;
    };
    "body": {
      "profile_id"?: string;
      "register"?: string;
      "type"?: string;
    };
  };
  "/api/private/profile_file/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_fileSelect;
      "include"?: Prisma.profile_fileInclude;
    };
  };
  "/api/private/profile_file/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profile_fileSelect;
      "include"?: Prisma.profile_fileInclude;
    };
    "body": {
      "file"?: any;
      "profile_id": string;
    };
  };
  "/api/private/profile_file/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_fileSelect;
      "include"?: Prisma.profile_fileInclude;
    };
    "body": {
      "name"?: string;
    };
  };
  "/api/private/profile_role/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_roleSelect;
      "include"?: Prisma.profile_roleInclude;
    };
  };
  "/api/private/profile_role/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_roleSelect;
      "include"?: Prisma.profile_roleInclude;
    };
  };
  "/api/private/profile_role/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profile_roleSelect;
      "include"?: Prisma.profile_roleInclude;
    };
    "body": {
      "active"?: string;
      "cost_center_id"?: string;
      "createdAt"?: string;
      "currency": string;
      "end_date"?: string;
      "pay": string;
      "payment_routine": string;
      "pro_rata"?: string;
      "profile_id": string;
      "recurrence": string;
      "role_id": string;
      "start_date": string;
    };
  };
  "/api/private/profile_role/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profile_roleSelect;
      "include"?: Prisma.profile_roleInclude;
      "profile_id"?: string;
    };
  };
  "/api/private/profile_role/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profile_roleSelect;
      "include"?: Prisma.profile_roleInclude;
    };
    "body": {
      "active"?: string;
      "cost_center_id"?: string;
      "currency"?: string;
      "end_date"?: string;
      "pay"?: string;
      "payment_routine"?: string;
      "pro_rata"?: string;
      "profile_id"?: string;
      "recurrence"?: string;
      "role_id"?: string;
      "start_date"?: string;
    };
  };
  "/api/private/profile/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
      "return"?: string;
      "active"?: string;
      "anonymous"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/profile/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
      "active"?: string;
      "anonymous"?: string;
    };
  };
  "/api/private/profile/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
      "return"?: string;
      "active"?: string;
      "anonymous"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/profile/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/profile/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
    };
  };
  "/api/private/profile/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
    };
    "body": {
      "active"?: string;
      "anonymous_avatar"?: any;
      "anonymous_email"?: string;
      "anonymous_name": string;
      "phone"?: string;
    };
  };
  "/api/private/profile/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
    };
  };
  "/api/private/profile/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.profileSelect;
      "include"?: Prisma.profileInclude;
      "return"?: string;
      "active"?: string;
      "anonymous"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "anonymous_avatar"?: any;
      "anonymous_email"?: string;
      "anonymous_name"?: string;
      "entity"?: string;
      "level_id"?: string;
      "phone"?: string;
      "type"?: string;
    };
  };
  "/api/private/project_allocation/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_allocationSelect;
      "include"?: Prisma.project_allocationInclude;
    };
  };
  "/api/private/project_allocation/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_allocationSelect;
      "include"?: Prisma.project_allocationInclude;
      "project_id"?: string;
      "project_version_id"?: string;
      "profile_id"?: string;
    };
  };
  "/api/private/project_allocation/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_allocationSelect;
      "include"?: Prisma.project_allocationInclude;
    };
  };
  "/api/private/project_allocation/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_allocationSelect;
      "include"?: Prisma.project_allocationInclude;
    };
    "body": {
      "end_date"?: string;
      "profile_id": string;
      "project_id": string;
      "project_version_id": string;
      "start_date"?: string;
    };
  };
  "/api/private/project_allocation/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_allocationSelect;
      "include"?: Prisma.project_allocationInclude;
      "project_id"?: string;
      "project_version_id"?: string;
      "profile_id"?: string;
    };
  };
  "/api/private/project_allocation/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_allocationSelect;
      "include"?: Prisma.project_allocationInclude;
    };
    "body": {
      "end_date"?: string;
      "profile_id"?: string;
      "project_id"?: string;
      "project_version_id"?: string;
      "start_date"?: string;
    };
  };
  "/api/private/project_config/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_configSelect;
      "include"?: Prisma.project_configInclude;
    };
  };
  "/api/private/project_config/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_configSelect;
      "include"?: Prisma.project_configInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_config/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_configSelect;
      "include"?: Prisma.project_configInclude;
    };
  };
  "/api/private/project_config/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_configSelect;
      "include"?: Prisma.project_configInclude;
    };
    "body": {
      "project_id": string;
      "project_version_id": string;
      "total_hour_day": string;
      "util_hour_day": string;
    };
  };
  "/api/private/project_config/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_configSelect;
      "include"?: Prisma.project_configInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_config/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_configSelect;
      "include"?: Prisma.project_configInclude;
    };
    "body": {
      "project_id"?: string;
      "project_version_id"?: string;
      "total_hour_day"?: string;
      "util_hour_day"?: string;
    };
  };
  "/api/private/project_financial_employees/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_financial_employeesSelect;
      "include"?: Prisma.project_financial_employeesInclude;
    };
  };
  "/api/private/project_financial_employees/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_financial_employeesSelect;
      "include"?: Prisma.project_financial_employeesInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_financial_employees/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_financial_employeesSelect;
      "include"?: Prisma.project_financial_employeesInclude;
    };
  };
  "/api/private/project_financial_employees/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_financial_employeesSelect;
      "include"?: Prisma.project_financial_employeesInclude;
    };
    "body": {
      "currency": string;
      "project_financial_id": string;
      "project_id": string;
      "quantity": string;
      "role_id": string;
      "unit_value": string;
    };
  };
  "/api/private/project_financial_employees/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_financial_employeesSelect;
      "include"?: Prisma.project_financial_employeesInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_financial_employees/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_financial_employeesSelect;
      "include"?: Prisma.project_financial_employeesInclude;
    };
    "body": {
      "currency"?: string;
      "project_financial_id"?: string;
      "quantity"?: string;
      "role_id"?: string;
      "unit_value"?: string;
    };
  };
  "/api/private/project_financial/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_financialSelect;
      "include"?: Prisma.project_financialInclude;
    };
  };
  "/api/private/project_financial/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_financialSelect;
      "include"?: Prisma.project_financialInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_financial/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_financialSelect;
      "include"?: Prisma.project_financialInclude;
    };
  };
  "/api/private/project_financial/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_financialSelect;
      "include"?: Prisma.project_financialInclude;
    };
    "body": {
      "currency": string;
      "cycles": string;
      "discount"?: string;
      "project_id": string;
      "project_version_id": string;
      "title"?: string;
      "total_value": string;
      "work_type_id": string;
    };
  };
  "/api/private/project_financial/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_financialSelect;
      "include"?: Prisma.project_financialInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_financial/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_financialSelect;
      "include"?: Prisma.project_financialInclude;
    };
    "body": {
      "currency"?: string;
      "cycles"?: string;
      "discount"?: string;
      "project_version_id"?: string;
      "title"?: string;
      "total_value"?: string;
      "work_type_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_allocation/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_allocationSelect;
      "include"?: Prisma.project_kanban_cycle_allocationInclude;
    };
  };
  "/api/private/project_kanban_cycle_allocation/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_allocationSelect;
      "include"?: Prisma.project_kanban_cycle_allocationInclude;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "project_member_id"?: string;
      "profile_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_allocation/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_allocationSelect;
      "include"?: Prisma.project_kanban_cycle_allocationInclude;
    };
  };
  "/api/private/project_kanban_cycle_allocation/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_allocationSelect;
      "include"?: Prisma.project_kanban_cycle_allocationInclude;
    };
    "body": {
      "profile_id": string;
      "project_id": string;
      "project_kanban_cycle_id": string;
      "project_kanban_id": string;
      "project_member_id"?: string;
      "time"?: string;
      "unit": string;
    };
  };
  "/api/private/project_kanban_cycle_allocation/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_allocationSelect;
      "include"?: Prisma.project_kanban_cycle_allocationInclude;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_allocation/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_allocationSelect;
      "include"?: Prisma.project_kanban_cycle_allocationInclude;
    };
    "body": {
      "profile_id"?: string;
      "project_id"?: string;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
      "project_member_id"?: string;
      "time"?: string;
      "unit"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card_comment/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_commentSelect;
      "include"?: Prisma.project_kanban_cycle_card_commentInclude;
    };
  };
  "/api/private/project_kanban_cycle_card_comment/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_commentSelect;
      "include"?: Prisma.project_kanban_cycle_card_commentInclude;
    };
    "body": {
      "project_id": string;
      "project_kanban_cycle_card_id": string;
      "project_kanban_cycle_comment_id"?: string;
      "project_kanban_id": string;
      "text": string;
    };
  };
  "/api/private/project_kanban_cycle_card_comment/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_commentSelect;
      "include"?: Prisma.project_kanban_cycle_card_commentInclude;
    };
    "body": {
      "project_id"?: string;
      "project_kanban_cycle_card_id"?: string;
      "project_kanban_cycle_comment_id"?: string;
      "project_kanban_id"?: string;
      "text"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card_file/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_fileSelect;
      "include"?: Prisma.project_kanban_cycle_card_fileInclude;
    };
  };
  "/api/private/project_kanban_cycle_card_file/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_fileSelect;
      "include"?: Prisma.project_kanban_cycle_card_fileInclude;
    };
    "body": {
      "file"?: any;
      "project_id": string;
      "project_kanban_cycle_card_id": string;
    };
  };
  "/api/private/project_kanban_cycle_card_file/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_fileSelect;
      "include"?: Prisma.project_kanban_cycle_card_fileInclude;
    };
    "body": {
      "name"?: string;
      "project_id"?: string;
      "project_kanban_cycle_card_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card_read/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_readSelect;
      "include"?: Prisma.project_kanban_cycle_card_readInclude;
    };
    "body": {
      "action": string;
      "project_id": string;
      "project_kanban_cycle_card_id": string;
    };
  };
  "/api/private/project_kanban_cycle_card_type/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_typeSelect;
      "include"?: Prisma.project_kanban_cycle_card_typeInclude;
      "delete_cards"?: string;
      "project_kanban_cycle_card_type_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card_type/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_card_typeSelect;
      "include"?: Prisma.project_kanban_cycle_card_typeInclude;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_kanban_cycle_id"?: string;
      "principal"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card_type/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_typeSelect;
      "include"?: Prisma.project_kanban_cycle_card_typeInclude;
    };
  };
  "/api/private/project_kanban_cycle_card_type/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_typeSelect;
      "include"?: Prisma.project_kanban_cycle_card_typeInclude;
    };
    "body": {
      "color"?: string;
      "icon"?: string;
      "kanban_template_card_type_id"?: string;
      "principal"?: string;
      "problem"?: string;
      "project_id": string;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id": string;
      "title"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card_type/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_card_typeSelect;
      "include"?: Prisma.project_kanban_cycle_card_typeInclude;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_kanban_cycle_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card_type/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_card_typeSelect;
      "include"?: Prisma.project_kanban_cycle_card_typeInclude;
    };
    "body": {
      "color"?: string;
      "icon"?: string;
      "kanban_template_card_type_id"?: string;
      "project_id"?: string;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
      "title"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
      "card_id"?: string;
      "delete_cards"?: string;
      "unlink_cards"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
      "project_kanban_cycle_card_type_id"?: string;
      "card_id"?: string;
      "project_kanban_cycle_column_id"?: string;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "principal"?: string;
      "card_type"?: string;
      "profile_id"?: string;
      "work_type_id"?: string;
      "end_date_estimate_start"?: string;
      "end_date_estimate_end"?: string;
      "project_kanban_objective_id"?: string;
      "project_kanban_objective_target_id"?: string;
      "end_date_execute_start"?: string;
      "end_date_execute_end"?: string;
      "severity_min"?: string;
      "severity_max"?: string;
      "priority_min"?: string;
      "priority_max"?: string;
      "estimate_min"?: string;
      "estimate_max"?: string;
      "execute_min"?: string;
      "execute_max"?: string;
      "work_in_progress_min"?: string;
      "work_in_progress_max"?: string;
      "description"?: string;
      "public_id"?: string;
      "tag"?: string;
      "project_version_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card/many": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
    };
    "body": {
      "card_id"?: string;
      "column_id": string;
      "index": string;
      "order_type": string;
    };
  };
  "/api/private/project_kanban_cycle_card/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
    };
    "body": {
      "card_id"?: string;
      "project_kanban_cycle_card_type_id": string;
      "project_kanban_cycle_column_id": string;
      "project_kanban_cycle_id": string;
    };
  };
  "/api/private/project_kanban_cycle_card/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
    };
  };
  "/api/private/project_kanban_cycle_card/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
    };
    "body": {
      "accept_description"?: string;
      "card_id"?: string;
      "description"?: string;
      "end_date_estimate"?: string;
      "end_date_execute"?: string;
      "estimate"?: string;
      "estimate_unit"?: string;
      "execute"?: string;
      "execute_unit"?: string;
      "order"?: string;
      "position"?: string;
      "priority"?: string;
      "profile_id"?: string;
      "project_id": string;
      "project_kanban_cycle_card_type_id": string;
      "project_kanban_cycle_column_id": string;
      "project_kanban_cycle_id": string;
      "project_kanban_id": string;
      "project_kanban_objective_id"?: string;
      "project_kanban_objective_target_id"?: string;
      "project_member_id"?: string;
      "severity"?: string;
      "title": string;
      "work_in_progress"?: string;
      "work_in_progress_unit"?: string;
      "work_type_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
      "project_kanban_cycle_card_type_id"?: string;
      "card_id"?: string;
      "project_kanban_cycle_column_id"?: string;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "principal"?: string;
      "project_version_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_card/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_cardSelect;
      "include"?: Prisma.project_kanban_cycle_cardInclude;
    };
    "body": {
      "accept_description"?: string;
      "action"?: string;
      "card_id"?: string;
      "description"?: string;
      "end_date_estimate"?: string;
      "end_date_execute"?: string;
      "estimate"?: string;
      "estimate_unit"?: string;
      "execute"?: string;
      "execute_unit"?: string;
      "order"?: string;
      "priority"?: string;
      "profile_id"?: string;
      "project_id"?: string;
      "project_kanban_cycle_card_tags"?: any[];
      "project_kanban_cycle_card_type_id"?: string;
      "project_kanban_cycle_column_id"?: string;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
      "project_kanban_objective_id"?: string;
      "project_kanban_objective_target_id"?: string;
      "project_member_id"?: string;
      "severity"?: string;
      "title"?: string;
      "work_in_progress"?: string;
      "work_in_progress_unit"?: string;
      "work_type_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_column/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_columnSelect;
      "include"?: Prisma.project_kanban_cycle_columnInclude;
      "delete_cards"?: string;
      "project_kanban_cycle_column_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_column/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_columnSelect;
      "include"?: Prisma.project_kanban_cycle_columnInclude;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_kanban_cycle_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_column/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_columnSelect;
      "include"?: Prisma.project_kanban_cycle_columnInclude;
    };
    "body": {
      "data": any[];
    };
  };
  "/api/private/project_kanban_cycle_column/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_columnSelect;
      "include"?: Prisma.project_kanban_cycle_columnInclude;
    };
  };
  "/api/private/project_kanban_cycle_column/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_columnSelect;
      "include"?: Prisma.project_kanban_cycle_columnInclude;
    };
    "body": {
      "color"?: string;
      "description"?: string;
      "finished"?: string;
      "limit"?: string;
      "project_id": string;
      "project_kanban_cycle_id": string;
      "project_kanban_id": string;
      "title": string;
    };
  };
  "/api/private/project_kanban_cycle_column/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycle_columnSelect;
      "include"?: Prisma.project_kanban_cycle_columnInclude;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_kanban_cycle_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle_column/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycle_columnSelect;
      "include"?: Prisma.project_kanban_cycle_columnInclude;
    };
    "body": {
      "color"?: string;
      "description"?: string;
      "finished"?: string;
      "limit"?: string;
      "order"?: string;
      "project_id"?: string;
      "project_kanban_cycle_id"?: string;
      "project_kanban_id"?: string;
      "title"?: string;
    };
  };
  "/api/private/project_kanban_cycle/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
      "project_kanban_cycle_id"?: string;
      "project_kanban_cycle_column_id"?: string;
      "delete_cards"?: string;
    };
  };
  "/api/private/project_kanban_cycle/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_version_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
    };
    "body": {
      "data": any[];
    };
  };
  "/api/private/project_kanban_cycle/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
    };
  };
  "/api/private/project_kanban_cycle/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
    };
  };
  "/api/private/project_kanban_cycle/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
    };
    "body": {
      "end_date"?: string;
      "kanban_template_id"?: string;
      "prepare"?: string;
      "project_id": string;
      "project_kanban_id": string;
      "project_version_id": string;
      "start_date"?: string;
      "title": string;
      "util_day"?: string;
      "work_type_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_version_id"?: string;
    };
  };
  "/api/private/project_kanban_cycle/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_cycleSelect;
      "include"?: Prisma.project_kanban_cycleInclude;
    };
    "body": {
      "end_date"?: string;
      "prepare"?: string;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_version_id"?: string;
      "start_date"?: string;
      "title"?: string;
      "util_day"?: string;
      "work_type_id"?: string;
    };
  };
  "/api/private/project_kanban_objective_target/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objective_targetSelect;
      "include"?: Prisma.project_kanban_objective_targetInclude;
    };
  };
  "/api/private/project_kanban_objective_target/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_objective_targetSelect;
      "include"?: Prisma.project_kanban_objective_targetInclude;
      "project_kanban_objective_id"?: string;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "concluded"?: string;
    };
  };
  "/api/private/project_kanban_objective_target/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objective_targetSelect;
      "include"?: Prisma.project_kanban_objective_targetInclude;
    };
  };
  "/api/private/project_kanban_objective_target/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_objective_targetSelect;
      "include"?: Prisma.project_kanban_objective_targetInclude;
    };
    "body": {
      "concluded"?: string;
      "createdAt"?: string;
      "description"?: string;
      "project_id": string;
      "project_kanban_id": string;
      "project_kanban_objective_id": string;
      "title": string;
    };
  };
  "/api/private/project_kanban_objective_target/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_objective_targetSelect;
      "include"?: Prisma.project_kanban_objective_targetInclude;
      "project_kanban_objective_id"?: string;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "concluded"?: string;
    };
  };
  "/api/private/project_kanban_objective_target/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objective_targetSelect;
      "include"?: Prisma.project_kanban_objective_targetInclude;
    };
    "body": {
      "concluded"?: string;
      "description"?: string;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_kanban_objective_id"?: string;
      "title"?: string;
    };
  };
  "/api/private/project_kanban_objective/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
      "return"?: string;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "concluded"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/project_kanban_objective/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "concluded"?: string;
    };
  };
  "/api/private/project_kanban_objective/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
      "return"?: string;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "concluded"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/project_kanban_objective/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
      "return"?: string;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "concluded"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/project_kanban_objective/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
    };
  };
  "/api/private/project_kanban_objective/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
      "return"?: string;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "concluded"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "concluded"?: string;
      "description"?: string;
      "project_id": string;
      "project_kanban_id": string;
      "title": string;
    };
  };
  "/api/private/project_kanban_objective/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "concluded"?: string;
    };
  };
  "/api/private/project_kanban_objective/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanban_objectiveSelect;
      "include"?: Prisma.project_kanban_objectiveInclude;
      "return"?: string;
      "project_kanban_id"?: string;
      "project_id"?: string;
      "concluded"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "concluded"?: string;
      "description"?: string;
      "project_id"?: string;
      "project_kanban_id"?: string;
      "title"?: string;
    };
  };
  "/api/private/project_kanban_report/index": {
    "method": "GET";
    "query"?: {
      "project_id"?: string;
      "project_kanban_id"?: string;
      "project_kanban_cycle_card_type_id"?: string;
      "project_version_id"?: string;
      "project_kanban_cycle_id"?: string;
      "profile_id"?: string;
      "work_type_id"?: string;
      "project_kanban_objective_id"?: string;
      "export"?: string;
    };
  };
  "/api/private/project_kanban/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanbanSelect;
      "include"?: Prisma.project_kanbanInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/project_kanban/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanbanSelect;
      "include"?: Prisma.project_kanbanInclude;
    };
  };
  "/api/private/project_kanban/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanbanSelect;
      "include"?: Prisma.project_kanbanInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/project_kanban/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanbanSelect;
      "include"?: Prisma.project_kanbanInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/project_kanban/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_kanbanSelect;
      "include"?: Prisma.project_kanbanInclude;
    };
  };
  "/api/private/project_kanban/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_kanbanSelect;
      "include"?: Prisma.project_kanbanInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "project_id": string;
    };
  };
  "/api/private/project_kanban/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_kanbanSelect;
      "include"?: Prisma.project_kanbanInclude;
    };
  };
  "/api/private/project_member/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_memberSelect;
      "include"?: Prisma.project_memberInclude;
    };
  };
  "/api/private/project_member/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_memberSelect;
      "include"?: Prisma.project_memberInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_member/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_memberSelect;
      "include"?: Prisma.project_memberInclude;
    };
  };
  "/api/private/project_member/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_memberSelect;
      "include"?: Prisma.project_memberInclude;
    };
    "body": {
      "profile_id": string;
      "project_id": string;
    };
  };
  "/api/private/project_member/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_memberSelect;
      "include"?: Prisma.project_memberInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_tool/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_toolSelect;
      "include"?: Prisma.project_toolInclude;
    };
  };
  "/api/private/project_tool/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_toolSelect;
      "include"?: Prisma.project_toolInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_tool/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_toolSelect;
      "include"?: Prisma.project_toolInclude;
    };
  };
  "/api/private/project_tool/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_toolSelect;
      "include"?: Prisma.project_toolInclude;
    };
    "body": {
      "consumption": string;
      "currency": string;
      "description"?: string;
      "end_date"?: string;
      "project_id": string;
      "project_version_id": string;
      "recurrence": string;
      "start_date"?: string;
      "title": string;
      "type": string;
      "value": string;
    };
  };
  "/api/private/project_tool/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_toolSelect;
      "include"?: Prisma.project_toolInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_tool/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_toolSelect;
      "include"?: Prisma.project_toolInclude;
    };
    "body": {
      "consumption"?: string;
      "currency"?: string;
      "description"?: string;
      "end_date"?: string;
      "project_id"?: string;
      "project_version_id"?: string;
      "recurrence"?: string;
      "start_date"?: string;
      "title"?: string;
      "type"?: string;
      "value"?: string;
    };
  };
  "/api/private/project_version/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_versionSelect;
      "include"?: Prisma.project_versionInclude;
    };
  };
  "/api/private/project_version/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_versionSelect;
      "include"?: Prisma.project_versionInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_version/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_versionSelect;
      "include"?: Prisma.project_versionInclude;
    };
  };
  "/api/private/project_version/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_versionSelect;
      "include"?: Prisma.project_versionInclude;
    };
  };
  "/api/private/project_version/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.project_versionSelect;
      "include"?: Prisma.project_versionInclude;
    };
    "body": {
      "name"?: string;
      "original_end_date"?: string;
      "original_start_date"?: string;
      "owner_id": string;
      "project_id": string;
      "real_end_date"?: string;
      "real_start_date"?: string;
      "version": string;
    };
  };
  "/api/private/project_version/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.project_versionSelect;
      "include"?: Prisma.project_versionInclude;
      "project_id"?: string;
    };
  };
  "/api/private/project_version/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.project_versionSelect;
      "include"?: Prisma.project_versionInclude;
    };
    "body": {
      "name"?: string;
      "original_end_date"?: string;
      "original_start_date"?: string;
      "owner_id"?: string;
      "real_end_date"?: string;
      "real_start_date"?: string;
      "version"?: string;
    };
  };
  "/api/private/project/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/project/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
    };
  };
  "/api/private/project/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/project/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/project/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
    };
  };
  "/api/private/project/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "client_id"?: string;
      "name": string;
    };
  };
  "/api/private/project/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
    };
  };
  "/api/private/project/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.projectSelect;
      "include"?: Prisma.projectInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "client_id"?: string;
      "name"?: string;
    };
  };
  "/api/private/role/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/role/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
    };
  };
  "/api/private/role/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/role/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/role/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
    };
  };
  "/api/private/role/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "cost_center_id"?: string;
      "currency": string;
      "pay": string;
      "recurrence"?: string;
      "title": string;
      "work_type_id": string;
    };
  };
  "/api/private/role/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
    };
  };
  "/api/private/role/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.roleSelect;
      "include"?: Prisma.roleInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "cost_center_id"?: string;
      "currency"?: string;
      "pay"?: string;
      "recurrence"?: string;
      "title"?: string;
      "work_type_id"?: string;
    };
  };
  "/api/private/subscription/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.subscriptionSelect;
      "include"?: Prisma.subscriptionInclude;
    };
  };
  "/api/private/subscription/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.subscriptionSelect;
      "include"?: Prisma.subscriptionInclude;
    };
  };
  "/api/private/subscription/update": {
    "method": "POST";
    "params": {
      "price_id": string;
    };
  };
  "/api/private/user_two_auth_code/confirm": {
    "method": "POST";
    "params": {
      "id": string;
    };
    "body": {
      "code": string;
    };
  };
  "/api/private/user_two_auth_code/store": {
    "method": "POST";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.user_two_auth_codeSelect;
      "include"?: Prisma.user_two_auth_codeInclude;
    };
  };
  "/api/private/user_two_auth/confirm": {
    "method": "POST";
    "params": {
      "id": string;
    };
    "body": {
      "code": string;
    };
  };
  "/api/private/user_two_auth/destroy": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.user_two_authSelect;
      "include"?: Prisma.user_two_authInclude;
    };
    "body": {
      "current_password": string;
    };
  };
  "/api/private/user_two_auth/resend": {
    "method": "GET";
    "params": {
      "id": string;
    };
  };
  "/api/private/user_two_auth/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.user_two_authSelect;
      "include"?: Prisma.user_two_authInclude;
    };
    "body": {
      "active"?: string;
      "current_password": string;
      "method": string;
      "target": string;
    };
  };
  "/api/private/user_two_auth/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.user_two_authSelect;
      "include"?: Prisma.user_two_authInclude;
    };
    "body": {
      "active"?: string;
      "current_password": string;
    };
  };
  "/api/private/user/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.userSelect;
      "include"?: Prisma.userInclude;
    };
    "body": {
      "avatar"?: any;
      "default_profile_id"?: string;
      "name"?: string;
    };
  };
  "/api/private/vectorize/destroy": {
    "method": "PUT";
    "params": {
      "file": string;
    };
    "body": {
      "feature": string;
      "key": string;
    };
  };
  "/api/private/vectorize/update": {
    "method": "PUT";
    "params": {
      "file": string;
    };
    "body": {
      "feature": string;
      "key": string;
    };
  };
  "/api/private/work_type/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/work_type/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
    };
  };
  "/api/private/work_type/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/api/private/work_type/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/api/private/work_type/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
    };
  };
  "/api/private/work_type/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "title": string;
    };
  };
  "/api/private/work_type/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
    };
  };
  "/api/private/work_type/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.work_typeSelect;
      "include"?: Prisma.work_typeInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "active"?: string;
      "title"?: string;
    };
  };
  "/api/public/action/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.actionSelect;
      "include"?: Prisma.actionInclude;
    };
  };
  "/api/public/auth/login": {
    "method": "POST";
    "body": {
      "email": string;
      "password": string;
    };
  };
  "/api/public/auth/recovery": {
    "method": "POST";
    "body": {
      "email": string;
    };
  };
  "/api/public/auth/reset": {
    "method": "POST";
    "params": {
      "code": string;
    };
    "body": {
      "password": string;
      "password_confirm": string;
    };
  };
  "/api/public/google/callback": {
    "method": "GET";
  };
  "/api/public/google/login": {
    "method": "GET";
  };
  "/api/public/google/me": {
    "method": "GET";
  };
  "/api/public/module/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.moduleSelect;
      "include"?: Prisma.moduleInclude;
    };
  };
  "/api/public/plan/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.planSelect;
      "include"?: Prisma.planInclude;
    };
  };
  "/api/public/user/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.userSelect;
      "include"?: Prisma.userInclude;
    };
    "body": {
      "active"?: string;
      "email": string;
      "name": string;
      "password": string;
      "password_confirm": string;
    };
  };
  "/integration/private/client/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/integration/private/client/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
    };
  };
  "/integration/private/client/many": {
    "method": "PUT";
    "params": {
      "ids": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "deleted": string;
      "deletedAt": string;
    };
  };
  "/integration/private/client/restore": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
  };
  "/integration/private/client/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
    };
  };
  "/integration/private/client/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "avatar"?: any;
      "comment"?: string;
      "email"?: string;
      "name": string;
      "phone"?: string;
    };
  };
  "/integration/private/client/trash": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
    };
  };
  "/integration/private/client/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.clientSelect;
      "include"?: Prisma.clientInclude;
      "return"?: string;
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
    };
    "body": {
      "avatar"?: any;
      "comment"?: string;
      "email"?: string;
      "name"?: string;
      "phone"?: string;
    };
  };
  "/manager/private/action/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.actionSelect;
      "include"?: Prisma.actionInclude;
    };
  };
  "/manager/private/action/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.actionSelect;
      "include"?: Prisma.actionInclude;
    };
    "body": {
      "deleted"?: string;
      "title": string;
    };
  };
  "/manager/private/action/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.actionSelect;
      "include"?: Prisma.actionInclude;
    };
    "body": {
      "deleted"?: string;
      "title"?: string;
    };
  };
  "/manager/private/auth/code": {
    "method": "PUT";
    "params": {
      "code": string;
    };
  };
  "/manager/private/auth/confirm": {
    "method": "GET";
  };
  "/manager/private/auth/need_reset": {
    "method": "POST";
    "body": {
      "password": string;
      "password_confirm": string;
    };
  };
  "/manager/private/auth/reset": {
    "method": "POST";
    "body": {
      "current_password": string;
      "password": string;
      "password_confirm": string;
    };
  };
  "/manager/private/billing_error/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.billing_errorSelect;
      "include"?: Prisma.billing_errorInclude;
    };
  };
  "/manager/private/company/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.companySelect;
      "include"?: Prisma.companyInclude;
    };
  };
  "/manager/private/feature/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.featureSelect;
      "include"?: Prisma.featureInclude;
    };
  };
  "/manager/private/feature/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.featureSelect;
      "include"?: Prisma.featureInclude;
    };
    "body": {
      "actions"?: string;
      "deleted": string;
      "group"?: string;
      "icon"?: string;
      "module_id": string;
      "order": string;
      "path": string;
      "plan_title": string;
      "reference"?: string;
      "route"?: string;
      "show_plan": string;
      "sidebar"?: string;
      "title": string;
    };
  };
  "/manager/private/feature/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.featureSelect;
      "include"?: Prisma.featureInclude;
    };
    "body": {
      "actions"?: string;
      "deleted"?: string;
      "group"?: string;
      "icon"?: string;
      "module_id"?: string;
      "order"?: string;
      "path"?: string;
      "plan_title"?: string;
      "reference"?: string;
      "route"?: string;
      "show_plan"?: string;
      "sidebar"?: string;
      "title"?: string;
    };
  };
  "/manager/private/module/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.moduleSelect;
      "include"?: Prisma.moduleInclude;
    };
  };
  "/manager/private/module/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.moduleSelect;
      "include"?: Prisma.moduleInclude;
    };
    "body": {
      "company_id"?: string;
      "deleted"?: string;
      "icon": string;
      "order": string;
      "title": string;
    };
  };
  "/manager/private/module/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.moduleSelect;
      "include"?: Prisma.moduleInclude;
    };
    "body": {
      "company_id"?: string;
      "deleted"?: string;
      "icon"?: string;
      "order"?: string;
      "title"?: string;
    };
  };
  "/manager/private/plan_feature_action/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.plan_feature_actionSelect;
      "include"?: Prisma.plan_feature_actionInclude;
    };
  };
  "/manager/private/plan_feature_action/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.plan_feature_actionSelect;
      "include"?: Prisma.plan_feature_actionInclude;
    };
    "body": {
      "action_id": string;
      "plan_feature_id": string;
    };
  };
  "/manager/private/plan_feature/destroy": {
    "method": "DELETE";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.plan_featureSelect;
      "include"?: Prisma.plan_featureInclude;
    };
  };
  "/manager/private/plan_feature/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.plan_featureSelect;
      "include"?: Prisma.plan_featureInclude;
    };
    "body": {
      "feature_id": string;
      "plan_id": string;
    };
  };
  "/manager/private/plan/index": {
    "method": "GET";
    "query"?: {
      "limit"?: string;
      "page"?: string;
      "search"?: string;
      "orderKey"?: string;
      "orderValue"?: string;
      "startDate"?: string;
      "endDate"?: string;
      "select"?: Prisma.planSelect;
      "include"?: Prisma.planInclude;
    };
  };
  "/manager/private/plan/show": {
    "method": "GET";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.planSelect;
      "include"?: Prisma.planInclude;
    };
  };
  "/manager/private/plan/store": {
    "method": "POST";
    "query"?: {
      "select"?: Prisma.planSelect;
      "include"?: Prisma.planInclude;
    };
    "body": {
      "billing_model"?: string;
      "company_id"?: string;
      "currency": string;
      "deleted"?: string;
      "free_test"?: string;
      "icon"?: string;
      "is_popular"?: string;
      "licenses"?: string;
      "order": string;
      "price"?: string;
      "title": string;
    };
  };
  "/manager/private/plan/update": {
    "method": "PUT";
    "params": {
      "id": string;
    };
    "query"?: {
      "select"?: Prisma.planSelect;
      "include"?: Prisma.planInclude;
    };
    "body": {
      "billing_model"?: string;
      "company_id"?: string;
      "currency"?: string;
      "deleted"?: string;
      "free_test"?: string;
      "icon"?: string;
      "is_popular"?: string;
      "licenses"?: string;
      "order"?: string;
      "price"?: string;
      "title"?: string;
    };
  };
  "/manager/public/auth/login": {
    "method": "POST";
    "body": {
      "email": string;
      "password": string;
    };
  };
  "/manager/public/auth/recovery": {
    "method": "POST";
    "body": {
      "email": string;
    };
  };
  "/manager/public/auth/reset": {
    "method": "POST";
    "params": {
      "code": string;
    };
    "body": {
      "password": string;
      "password_confirm": string;
    };
  };
};

export type Routes =
  | "/api/private/auth/code"
  | "/api/private/auth/confirm"
  | "/api/private/auth/hidrate"
  | "/api/private/auth/need_reset"
  | "/api/private/auth/reset"
  | "/api/private/billing/checkout"
  | "/api/private/billing/test"
  | "/api/private/billing/webhook"
  | "/api/private/chat/category"
  | "/api/private/chat/index"
  | "/api/private/chat/messages"
  | "/api/private/chat/show"
  | "/api/private/client_address/store"
  | "/api/private/client_address/update"
  | "/api/private/client_bank_account/destroy"
  | "/api/private/client_bank_account/index"
  | "/api/private/client_bank_account/restore"
  | "/api/private/client_bank_account/store"
  | "/api/private/client_bank_account/trash"
  | "/api/private/client_bank_account/update"
  | "/api/private/client_contact/destroy"
  | "/api/private/client_contact/restore"
  | "/api/private/client_contact/store"
  | "/api/private/client_contact/trash"
  | "/api/private/client_contact/update"
  | "/api/private/client_document/destroy"
  | "/api/private/client_document/restore"
  | "/api/private/client_document/store"
  | "/api/private/client_document/trash"
  | "/api/private/client_document/update"
  | "/api/private/client_file/destroy"
  | "/api/private/client_file/store"
  | "/api/private/client_file/update"
  | "/api/private/client/destroy"
  | "/api/private/client/index"
  | "/api/private/client/many"
  | "/api/private/client/restore"
  | "/api/private/client/show"
  | "/api/private/client/store"
  | "/api/private/client/trash"
  | "/api/private/client/update"
  | "/api/private/company_address/store"
  | "/api/private/company_address/update"
  | "/api/private/company_config/show"
  | "/api/private/company_config/store"
  | "/api/private/company_config/update"
  | "/api/private/company_contact/destroy"
  | "/api/private/company_contact/restore"
  | "/api/private/company_contact/store"
  | "/api/private/company_contact/trash"
  | "/api/private/company_contact/update"
  | "/api/private/company_document/destroy"
  | "/api/private/company_document/restore"
  | "/api/private/company_document/store"
  | "/api/private/company_document/trash"
  | "/api/private/company_document/update"
  | "/api/private/company_file/destroy"
  | "/api/private/company_file/store"
  | "/api/private/company_file/update"
  | "/api/private/company/show"
  | "/api/private/company/store"
  | "/api/private/company/update"
  | "/api/private/cost_center/destroy"
  | "/api/private/cost_center/index"
  | "/api/private/cost_center/many"
  | "/api/private/cost_center/restore"
  | "/api/private/cost_center/store"
  | "/api/private/cost_center/trash"
  | "/api/private/cost_center/update"
  | "/api/private/dashboard/index"
  | "/api/private/integration_action/update"
  | "/api/private/integration/destroy"
  | "/api/private/integration/index"
  | "/api/private/integration/many"
  | "/api/private/integration/restore"
  | "/api/private/integration/show"
  | "/api/private/integration/store"
  | "/api/private/integration/trash"
  | "/api/private/integration/update"
  | "/api/private/invite/destroy"
  | "/api/private/invite/feedback"
  | "/api/private/invite/index"
  | "/api/private/invite/many"
  | "/api/private/invite/me"
  | "/api/private/invite/restore"
  | "/api/private/invite/store"
  | "/api/private/invite/trash"
  | "/api/private/invite/update"
  | "/api/private/kanban_template_card_type/destroy"
  | "/api/private/kanban_template_card_type/index"
  | "/api/private/kanban_template_card_type/many"
  | "/api/private/kanban_template_card_type/restore"
  | "/api/private/kanban_template_card_type/store"
  | "/api/private/kanban_template_card_type/trash"
  | "/api/private/kanban_template_card_type/update"
  | "/api/private/kanban_template_card/destroy"
  | "/api/private/kanban_template_card/restore"
  | "/api/private/kanban_template_card/store"
  | "/api/private/kanban_template_card/trash"
  | "/api/private/kanban_template_column/destroy"
  | "/api/private/kanban_template_column/index"
  | "/api/private/kanban_template_column/many"
  | "/api/private/kanban_template_column/restore"
  | "/api/private/kanban_template_column/store"
  | "/api/private/kanban_template_column/trash"
  | "/api/private/kanban_template_column/update"
  | "/api/private/kanban_template_tag/destroy"
  | "/api/private/kanban_template_tag/index"
  | "/api/private/kanban_template_tag/many"
  | "/api/private/kanban_template_tag/restore"
  | "/api/private/kanban_template_tag/store"
  | "/api/private/kanban_template_tag/trash"
  | "/api/private/kanban_template_tag/update"
  | "/api/private/kanban_template/destroy"
  | "/api/private/kanban_template/index"
  | "/api/private/kanban_template/many"
  | "/api/private/kanban_template/restore"
  | "/api/private/kanban_template/show"
  | "/api/private/kanban_template/store"
  | "/api/private/kanban_template/trash"
  | "/api/private/kanban_template/update"
  | "/api/private/level_action/update"
  | "/api/private/level/destroy"
  | "/api/private/level/index"
  | "/api/private/level/many"
  | "/api/private/level/restore"
  | "/api/private/level/show"
  | "/api/private/level/store"
  | "/api/private/level/trash"
  | "/api/private/level/update"
  | "/api/private/me/show"
  | "/api/private/module/index"
  | "/api/private/notification_subscription/key"
  | "/api/private/notification_subscription/store"
  | "/api/private/notification/clean"
  | "/api/private/notification/index"
  | "/api/private/notification/update"
  | "/api/private/plan/index"
  | "/api/private/profile_address/store"
  | "/api/private/profile_address/update"
  | "/api/private/profile_bank_account/destroy"
  | "/api/private/profile_bank_account/index"
  | "/api/private/profile_bank_account/restore"
  | "/api/private/profile_bank_account/store"
  | "/api/private/profile_bank_account/trash"
  | "/api/private/profile_bank_account/update"
  | "/api/private/profile_bonus/destroy"
  | "/api/private/profile_bonus/restore"
  | "/api/private/profile_bonus/store"
  | "/api/private/profile_bonus/trash"
  | "/api/private/profile_bonus/update"
  | "/api/private/profile_contact/destroy"
  | "/api/private/profile_contact/restore"
  | "/api/private/profile_contact/store"
  | "/api/private/profile_contact/trash"
  | "/api/private/profile_contact/update"
  | "/api/private/profile_document/destroy"
  | "/api/private/profile_document/restore"
  | "/api/private/profile_document/store"
  | "/api/private/profile_document/trash"
  | "/api/private/profile_document/update"
  | "/api/private/profile_file/destroy"
  | "/api/private/profile_file/store"
  | "/api/private/profile_file/update"
  | "/api/private/profile_role/destroy"
  | "/api/private/profile_role/restore"
  | "/api/private/profile_role/store"
  | "/api/private/profile_role/trash"
  | "/api/private/profile_role/update"
  | "/api/private/profile/destroy"
  | "/api/private/profile/index"
  | "/api/private/profile/many"
  | "/api/private/profile/restore"
  | "/api/private/profile/show"
  | "/api/private/profile/store"
  | "/api/private/profile/trash"
  | "/api/private/profile/update"
  | "/api/private/project_allocation/destroy"
  | "/api/private/project_allocation/index"
  | "/api/private/project_allocation/restore"
  | "/api/private/project_allocation/store"
  | "/api/private/project_allocation/trash"
  | "/api/private/project_allocation/update"
  | "/api/private/project_config/destroy"
  | "/api/private/project_config/index"
  | "/api/private/project_config/restore"
  | "/api/private/project_config/store"
  | "/api/private/project_config/trash"
  | "/api/private/project_config/update"
  | "/api/private/project_financial_employees/destroy"
  | "/api/private/project_financial_employees/index"
  | "/api/private/project_financial_employees/restore"
  | "/api/private/project_financial_employees/store"
  | "/api/private/project_financial_employees/trash"
  | "/api/private/project_financial_employees/update"
  | "/api/private/project_financial/destroy"
  | "/api/private/project_financial/index"
  | "/api/private/project_financial/restore"
  | "/api/private/project_financial/store"
  | "/api/private/project_financial/trash"
  | "/api/private/project_financial/update"
  | "/api/private/project_kanban_cycle_allocation/destroy"
  | "/api/private/project_kanban_cycle_allocation/index"
  | "/api/private/project_kanban_cycle_allocation/restore"
  | "/api/private/project_kanban_cycle_allocation/store"
  | "/api/private/project_kanban_cycle_allocation/trash"
  | "/api/private/project_kanban_cycle_allocation/update"
  | "/api/private/project_kanban_cycle_card_comment/destroy"
  | "/api/private/project_kanban_cycle_card_comment/store"
  | "/api/private/project_kanban_cycle_card_comment/update"
  | "/api/private/project_kanban_cycle_card_file/destroy"
  | "/api/private/project_kanban_cycle_card_file/store"
  | "/api/private/project_kanban_cycle_card_file/update"
  | "/api/private/project_kanban_cycle_card_read/store"
  | "/api/private/project_kanban_cycle_card_type/destroy"
  | "/api/private/project_kanban_cycle_card_type/index"
  | "/api/private/project_kanban_cycle_card_type/restore"
  | "/api/private/project_kanban_cycle_card_type/store"
  | "/api/private/project_kanban_cycle_card_type/trash"
  | "/api/private/project_kanban_cycle_card_type/update"
  | "/api/private/project_kanban_cycle_card/destroy"
  | "/api/private/project_kanban_cycle_card/index"
  | "/api/private/project_kanban_cycle_card/many"
  | "/api/private/project_kanban_cycle_card/restore"
  | "/api/private/project_kanban_cycle_card/show"
  | "/api/private/project_kanban_cycle_card/store"
  | "/api/private/project_kanban_cycle_card/trash"
  | "/api/private/project_kanban_cycle_card/update"
  | "/api/private/project_kanban_cycle_column/destroy"
  | "/api/private/project_kanban_cycle_column/index"
  | "/api/private/project_kanban_cycle_column/many"
  | "/api/private/project_kanban_cycle_column/restore"
  | "/api/private/project_kanban_cycle_column/store"
  | "/api/private/project_kanban_cycle_column/trash"
  | "/api/private/project_kanban_cycle_column/update"
  | "/api/private/project_kanban_cycle/destroy"
  | "/api/private/project_kanban_cycle/index"
  | "/api/private/project_kanban_cycle/many"
  | "/api/private/project_kanban_cycle/restore"
  | "/api/private/project_kanban_cycle/show"
  | "/api/private/project_kanban_cycle/store"
  | "/api/private/project_kanban_cycle/trash"
  | "/api/private/project_kanban_cycle/update"
  | "/api/private/project_kanban_objective_target/destroy"
  | "/api/private/project_kanban_objective_target/index"
  | "/api/private/project_kanban_objective_target/restore"
  | "/api/private/project_kanban_objective_target/store"
  | "/api/private/project_kanban_objective_target/trash"
  | "/api/private/project_kanban_objective_target/update"
  | "/api/private/project_kanban_objective/destroy"
  | "/api/private/project_kanban_objective/index"
  | "/api/private/project_kanban_objective/many"
  | "/api/private/project_kanban_objective/restore"
  | "/api/private/project_kanban_objective/show"
  | "/api/private/project_kanban_objective/store"
  | "/api/private/project_kanban_objective/trash"
  | "/api/private/project_kanban_objective/update"
  | "/api/private/project_kanban_report/index"
  | "/api/private/project_kanban/destroy"
  | "/api/private/project_kanban/index"
  | "/api/private/project_kanban/many"
  | "/api/private/project_kanban/restore"
  | "/api/private/project_kanban/show"
  | "/api/private/project_kanban/store"
  | "/api/private/project_kanban/trash"
  | "/api/private/project_member/destroy"
  | "/api/private/project_member/index"
  | "/api/private/project_member/restore"
  | "/api/private/project_member/store"
  | "/api/private/project_member/trash"
  | "/api/private/project_tool/destroy"
  | "/api/private/project_tool/index"
  | "/api/private/project_tool/restore"
  | "/api/private/project_tool/store"
  | "/api/private/project_tool/trash"
  | "/api/private/project_tool/update"
  | "/api/private/project_version/destroy"
  | "/api/private/project_version/index"
  | "/api/private/project_version/restore"
  | "/api/private/project_version/show"
  | "/api/private/project_version/store"
  | "/api/private/project_version/trash"
  | "/api/private/project_version/update"
  | "/api/private/project/destroy"
  | "/api/private/project/index"
  | "/api/private/project/many"
  | "/api/private/project/restore"
  | "/api/private/project/show"
  | "/api/private/project/store"
  | "/api/private/project/trash"
  | "/api/private/project/update"
  | "/api/private/role/destroy"
  | "/api/private/role/index"
  | "/api/private/role/many"
  | "/api/private/role/restore"
  | "/api/private/role/show"
  | "/api/private/role/store"
  | "/api/private/role/trash"
  | "/api/private/role/update"
  | "/api/private/subscription/index"
  | "/api/private/subscription/show"
  | "/api/private/subscription/update"
  | "/api/private/user_two_auth_code/confirm"
  | "/api/private/user_two_auth_code/store"
  | "/api/private/user_two_auth/confirm"
  | "/api/private/user_two_auth/destroy"
  | "/api/private/user_two_auth/resend"
  | "/api/private/user_two_auth/store"
  | "/api/private/user_two_auth/update"
  | "/api/private/user/update"
  | "/api/private/vectorize/destroy"
  | "/api/private/vectorize/update"
  | "/api/private/work_type/destroy"
  | "/api/private/work_type/index"
  | "/api/private/work_type/many"
  | "/api/private/work_type/restore"
  | "/api/private/work_type/show"
  | "/api/private/work_type/store"
  | "/api/private/work_type/trash"
  | "/api/private/work_type/update"
  | "/api/public/action/index"
  | "/api/public/auth/login"
  | "/api/public/auth/recovery"
  | "/api/public/auth/reset"
  | "/api/public/google/callback"
  | "/api/public/google/login"
  | "/api/public/google/me"
  | "/api/public/module/index"
  | "/api/public/plan/index"
  | "/api/public/user/store"
  | "/integration/private/client/destroy"
  | "/integration/private/client/index"
  | "/integration/private/client/many"
  | "/integration/private/client/restore"
  | "/integration/private/client/show"
  | "/integration/private/client/store"
  | "/integration/private/client/trash"
  | "/integration/private/client/update"
  | "/manager/private/action/index"
  | "/manager/private/action/store"
  | "/manager/private/action/update"
  | "/manager/private/auth/code"
  | "/manager/private/auth/confirm"
  | "/manager/private/auth/need_reset"
  | "/manager/private/auth/reset"
  | "/manager/private/billing_error/index"
  | "/manager/private/company/index"
  | "/manager/private/feature/index"
  | "/manager/private/feature/store"
  | "/manager/private/feature/update"
  | "/manager/private/module/index"
  | "/manager/private/module/store"
  | "/manager/private/module/update"
  | "/manager/private/plan_feature_action/destroy"
  | "/manager/private/plan_feature_action/store"
  | "/manager/private/plan_feature/destroy"
  | "/manager/private/plan_feature/store"
  | "/manager/private/plan/index"
  | "/manager/private/plan/show"
  | "/manager/private/plan/store"
  | "/manager/private/plan/update"
  | "/manager/public/auth/login"
  | "/manager/public/auth/recovery"
  | "/manager/public/auth/reset";

export type RouteConfig<R extends Routes> = Endpoints[R];

// Objeto utilitário para runtime – contém só o método HTTP
export const flatEndpoints = {
  "/api/private/auth/code": {
    "method": "PUT"
  },
  "/api/private/auth/confirm": {
    "method": "GET"
  },
  "/api/private/auth/hidrate": {
    "method": "GET"
  },
  "/api/private/auth/need_reset": {
    "method": "POST"
  },
  "/api/private/auth/reset": {
    "method": "POST"
  },
  "/api/private/billing/checkout": {
    "method": "POST"
  },
  "/api/private/billing/test": {
    "method": "POST"
  },
  "/api/private/billing/webhook": {
    "method": "POST"
  },
  "/api/private/chat/category": {
    "method": "GET"
  },
  "/api/private/chat/index": {
    "method": "GET"
  },
  "/api/private/chat/messages": {
    "method": "POST"
  },
  "/api/private/chat/show": {
    "method": "GET"
  },
  "/api/private/client_address/store": {
    "method": "POST"
  },
  "/api/private/client_address/update": {
    "method": "PUT"
  },
  "/api/private/client_bank_account/destroy": {
    "method": "DELETE"
  },
  "/api/private/client_bank_account/index": {
    "method": "GET"
  },
  "/api/private/client_bank_account/restore": {
    "method": "PUT"
  },
  "/api/private/client_bank_account/store": {
    "method": "POST"
  },
  "/api/private/client_bank_account/trash": {
    "method": "GET"
  },
  "/api/private/client_bank_account/update": {
    "method": "PUT"
  },
  "/api/private/client_contact/destroy": {
    "method": "DELETE"
  },
  "/api/private/client_contact/restore": {
    "method": "PUT"
  },
  "/api/private/client_contact/store": {
    "method": "POST"
  },
  "/api/private/client_contact/trash": {
    "method": "GET"
  },
  "/api/private/client_contact/update": {
    "method": "PUT"
  },
  "/api/private/client_document/destroy": {
    "method": "DELETE"
  },
  "/api/private/client_document/restore": {
    "method": "PUT"
  },
  "/api/private/client_document/store": {
    "method": "POST"
  },
  "/api/private/client_document/trash": {
    "method": "GET"
  },
  "/api/private/client_document/update": {
    "method": "PUT"
  },
  "/api/private/client_file/destroy": {
    "method": "DELETE"
  },
  "/api/private/client_file/store": {
    "method": "POST"
  },
  "/api/private/client_file/update": {
    "method": "PUT"
  },
  "/api/private/client/destroy": {
    "method": "DELETE"
  },
  "/api/private/client/index": {
    "method": "GET"
  },
  "/api/private/client/many": {
    "method": "PUT"
  },
  "/api/private/client/restore": {
    "method": "PUT"
  },
  "/api/private/client/show": {
    "method": "GET"
  },
  "/api/private/client/store": {
    "method": "POST"
  },
  "/api/private/client/trash": {
    "method": "GET"
  },
  "/api/private/client/update": {
    "method": "PUT"
  },
  "/api/private/company_address/store": {
    "method": "POST"
  },
  "/api/private/company_address/update": {
    "method": "PUT"
  },
  "/api/private/company_config/show": {
    "method": "GET"
  },
  "/api/private/company_config/store": {
    "method": "POST"
  },
  "/api/private/company_config/update": {
    "method": "PUT"
  },
  "/api/private/company_contact/destroy": {
    "method": "DELETE"
  },
  "/api/private/company_contact/restore": {
    "method": "PUT"
  },
  "/api/private/company_contact/store": {
    "method": "POST"
  },
  "/api/private/company_contact/trash": {
    "method": "GET"
  },
  "/api/private/company_contact/update": {
    "method": "PUT"
  },
  "/api/private/company_document/destroy": {
    "method": "DELETE"
  },
  "/api/private/company_document/restore": {
    "method": "PUT"
  },
  "/api/private/company_document/store": {
    "method": "POST"
  },
  "/api/private/company_document/trash": {
    "method": "GET"
  },
  "/api/private/company_document/update": {
    "method": "PUT"
  },
  "/api/private/company_file/destroy": {
    "method": "DELETE"
  },
  "/api/private/company_file/store": {
    "method": "POST"
  },
  "/api/private/company_file/update": {
    "method": "PUT"
  },
  "/api/private/company/show": {
    "method": "GET"
  },
  "/api/private/company/store": {
    "method": "POST"
  },
  "/api/private/company/update": {
    "method": "PUT"
  },
  "/api/private/cost_center/destroy": {
    "method": "DELETE"
  },
  "/api/private/cost_center/index": {
    "method": "GET"
  },
  "/api/private/cost_center/many": {
    "method": "PUT"
  },
  "/api/private/cost_center/restore": {
    "method": "PUT"
  },
  "/api/private/cost_center/store": {
    "method": "POST"
  },
  "/api/private/cost_center/trash": {
    "method": "GET"
  },
  "/api/private/cost_center/update": {
    "method": "PUT"
  },
  "/api/private/dashboard/index": {
    "method": "GET"
  },
  "/api/private/integration_action/update": {
    "method": "POST"
  },
  "/api/private/integration/destroy": {
    "method": "DELETE"
  },
  "/api/private/integration/index": {
    "method": "GET"
  },
  "/api/private/integration/many": {
    "method": "PUT"
  },
  "/api/private/integration/restore": {
    "method": "PUT"
  },
  "/api/private/integration/show": {
    "method": "GET"
  },
  "/api/private/integration/store": {
    "method": "POST"
  },
  "/api/private/integration/trash": {
    "method": "GET"
  },
  "/api/private/integration/update": {
    "method": "PUT"
  },
  "/api/private/invite/destroy": {
    "method": "DELETE"
  },
  "/api/private/invite/feedback": {
    "method": "PUT"
  },
  "/api/private/invite/index": {
    "method": "GET"
  },
  "/api/private/invite/many": {
    "method": "PUT"
  },
  "/api/private/invite/me": {
    "method": "GET"
  },
  "/api/private/invite/restore": {
    "method": "PUT"
  },
  "/api/private/invite/store": {
    "method": "POST"
  },
  "/api/private/invite/trash": {
    "method": "GET"
  },
  "/api/private/invite/update": {
    "method": "PUT"
  },
  "/api/private/kanban_template_card_type/destroy": {
    "method": "DELETE"
  },
  "/api/private/kanban_template_card_type/index": {
    "method": "GET"
  },
  "/api/private/kanban_template_card_type/many": {
    "method": "PUT"
  },
  "/api/private/kanban_template_card_type/restore": {
    "method": "PUT"
  },
  "/api/private/kanban_template_card_type/store": {
    "method": "POST"
  },
  "/api/private/kanban_template_card_type/trash": {
    "method": "GET"
  },
  "/api/private/kanban_template_card_type/update": {
    "method": "PUT"
  },
  "/api/private/kanban_template_card/destroy": {
    "method": "DELETE"
  },
  "/api/private/kanban_template_card/restore": {
    "method": "PUT"
  },
  "/api/private/kanban_template_card/store": {
    "method": "POST"
  },
  "/api/private/kanban_template_card/trash": {
    "method": "GET"
  },
  "/api/private/kanban_template_column/destroy": {
    "method": "DELETE"
  },
  "/api/private/kanban_template_column/index": {
    "method": "GET"
  },
  "/api/private/kanban_template_column/many": {
    "method": "PUT"
  },
  "/api/private/kanban_template_column/restore": {
    "method": "PUT"
  },
  "/api/private/kanban_template_column/store": {
    "method": "POST"
  },
  "/api/private/kanban_template_column/trash": {
    "method": "GET"
  },
  "/api/private/kanban_template_column/update": {
    "method": "PUT"
  },
  "/api/private/kanban_template_tag/destroy": {
    "method": "DELETE"
  },
  "/api/private/kanban_template_tag/index": {
    "method": "GET"
  },
  "/api/private/kanban_template_tag/many": {
    "method": "PUT"
  },
  "/api/private/kanban_template_tag/restore": {
    "method": "PUT"
  },
  "/api/private/kanban_template_tag/store": {
    "method": "POST"
  },
  "/api/private/kanban_template_tag/trash": {
    "method": "GET"
  },
  "/api/private/kanban_template_tag/update": {
    "method": "PUT"
  },
  "/api/private/kanban_template/destroy": {
    "method": "DELETE"
  },
  "/api/private/kanban_template/index": {
    "method": "GET"
  },
  "/api/private/kanban_template/many": {
    "method": "PUT"
  },
  "/api/private/kanban_template/restore": {
    "method": "PUT"
  },
  "/api/private/kanban_template/show": {
    "method": "GET"
  },
  "/api/private/kanban_template/store": {
    "method": "POST"
  },
  "/api/private/kanban_template/trash": {
    "method": "GET"
  },
  "/api/private/kanban_template/update": {
    "method": "PUT"
  },
  "/api/private/level_action/update": {
    "method": "POST"
  },
  "/api/private/level/destroy": {
    "method": "DELETE"
  },
  "/api/private/level/index": {
    "method": "GET"
  },
  "/api/private/level/many": {
    "method": "PUT"
  },
  "/api/private/level/restore": {
    "method": "PUT"
  },
  "/api/private/level/show": {
    "method": "GET"
  },
  "/api/private/level/store": {
    "method": "POST"
  },
  "/api/private/level/trash": {
    "method": "GET"
  },
  "/api/private/level/update": {
    "method": "PUT"
  },
  "/api/private/me/show": {
    "method": "GET"
  },
  "/api/private/module/index": {
    "method": "GET"
  },
  "/api/private/notification_subscription/key": {
    "method": "GET"
  },
  "/api/private/notification_subscription/store": {
    "method": "POST"
  },
  "/api/private/notification/clean": {
    "method": "POST"
  },
  "/api/private/notification/index": {
    "method": "GET"
  },
  "/api/private/notification/update": {
    "method": "PUT"
  },
  "/api/private/plan/index": {
    "method": "GET"
  },
  "/api/private/profile_address/store": {
    "method": "POST"
  },
  "/api/private/profile_address/update": {
    "method": "PUT"
  },
  "/api/private/profile_bank_account/destroy": {
    "method": "DELETE"
  },
  "/api/private/profile_bank_account/index": {
    "method": "GET"
  },
  "/api/private/profile_bank_account/restore": {
    "method": "PUT"
  },
  "/api/private/profile_bank_account/store": {
    "method": "POST"
  },
  "/api/private/profile_bank_account/trash": {
    "method": "GET"
  },
  "/api/private/profile_bank_account/update": {
    "method": "PUT"
  },
  "/api/private/profile_bonus/destroy": {
    "method": "DELETE"
  },
  "/api/private/profile_bonus/restore": {
    "method": "PUT"
  },
  "/api/private/profile_bonus/store": {
    "method": "POST"
  },
  "/api/private/profile_bonus/trash": {
    "method": "GET"
  },
  "/api/private/profile_bonus/update": {
    "method": "PUT"
  },
  "/api/private/profile_contact/destroy": {
    "method": "DELETE"
  },
  "/api/private/profile_contact/restore": {
    "method": "PUT"
  },
  "/api/private/profile_contact/store": {
    "method": "POST"
  },
  "/api/private/profile_contact/trash": {
    "method": "GET"
  },
  "/api/private/profile_contact/update": {
    "method": "PUT"
  },
  "/api/private/profile_document/destroy": {
    "method": "DELETE"
  },
  "/api/private/profile_document/restore": {
    "method": "PUT"
  },
  "/api/private/profile_document/store": {
    "method": "POST"
  },
  "/api/private/profile_document/trash": {
    "method": "GET"
  },
  "/api/private/profile_document/update": {
    "method": "PUT"
  },
  "/api/private/profile_file/destroy": {
    "method": "DELETE"
  },
  "/api/private/profile_file/store": {
    "method": "POST"
  },
  "/api/private/profile_file/update": {
    "method": "PUT"
  },
  "/api/private/profile_role/destroy": {
    "method": "DELETE"
  },
  "/api/private/profile_role/restore": {
    "method": "PUT"
  },
  "/api/private/profile_role/store": {
    "method": "POST"
  },
  "/api/private/profile_role/trash": {
    "method": "GET"
  },
  "/api/private/profile_role/update": {
    "method": "PUT"
  },
  "/api/private/profile/destroy": {
    "method": "DELETE"
  },
  "/api/private/profile/index": {
    "method": "GET"
  },
  "/api/private/profile/many": {
    "method": "PUT"
  },
  "/api/private/profile/restore": {
    "method": "PUT"
  },
  "/api/private/profile/show": {
    "method": "GET"
  },
  "/api/private/profile/store": {
    "method": "POST"
  },
  "/api/private/profile/trash": {
    "method": "GET"
  },
  "/api/private/profile/update": {
    "method": "PUT"
  },
  "/api/private/project_allocation/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_allocation/index": {
    "method": "GET"
  },
  "/api/private/project_allocation/restore": {
    "method": "PUT"
  },
  "/api/private/project_allocation/store": {
    "method": "POST"
  },
  "/api/private/project_allocation/trash": {
    "method": "GET"
  },
  "/api/private/project_allocation/update": {
    "method": "PUT"
  },
  "/api/private/project_config/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_config/index": {
    "method": "GET"
  },
  "/api/private/project_config/restore": {
    "method": "PUT"
  },
  "/api/private/project_config/store": {
    "method": "POST"
  },
  "/api/private/project_config/trash": {
    "method": "GET"
  },
  "/api/private/project_config/update": {
    "method": "PUT"
  },
  "/api/private/project_financial_employees/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_financial_employees/index": {
    "method": "GET"
  },
  "/api/private/project_financial_employees/restore": {
    "method": "PUT"
  },
  "/api/private/project_financial_employees/store": {
    "method": "POST"
  },
  "/api/private/project_financial_employees/trash": {
    "method": "GET"
  },
  "/api/private/project_financial_employees/update": {
    "method": "PUT"
  },
  "/api/private/project_financial/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_financial/index": {
    "method": "GET"
  },
  "/api/private/project_financial/restore": {
    "method": "PUT"
  },
  "/api/private/project_financial/store": {
    "method": "POST"
  },
  "/api/private/project_financial/trash": {
    "method": "GET"
  },
  "/api/private/project_financial/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_allocation/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_cycle_allocation/index": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_allocation/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_allocation/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle_allocation/trash": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_allocation/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_card_comment/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_cycle_card_comment/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle_card_comment/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_card_file/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_cycle_card_file/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle_card_file/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_card_read/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle_card_type/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_cycle_card_type/index": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_card_type/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_card_type/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle_card_type/trash": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_card_type/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_card/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_cycle_card/index": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_card/many": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_card/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_card/show": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_card/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle_card/trash": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_card/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_column/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_cycle_column/index": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_column/many": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_column/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle_column/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle_column/trash": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle_column/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_cycle/index": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle/many": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban_cycle/show": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_cycle/trash": {
    "method": "GET"
  },
  "/api/private/project_kanban_cycle/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_objective_target/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_objective_target/index": {
    "method": "GET"
  },
  "/api/private/project_kanban_objective_target/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban_objective_target/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_objective_target/trash": {
    "method": "GET"
  },
  "/api/private/project_kanban_objective_target/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_objective/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban_objective/index": {
    "method": "GET"
  },
  "/api/private/project_kanban_objective/many": {
    "method": "PUT"
  },
  "/api/private/project_kanban_objective/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban_objective/show": {
    "method": "GET"
  },
  "/api/private/project_kanban_objective/store": {
    "method": "POST"
  },
  "/api/private/project_kanban_objective/trash": {
    "method": "GET"
  },
  "/api/private/project_kanban_objective/update": {
    "method": "PUT"
  },
  "/api/private/project_kanban_report/index": {
    "method": "GET"
  },
  "/api/private/project_kanban/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_kanban/index": {
    "method": "GET"
  },
  "/api/private/project_kanban/many": {
    "method": "PUT"
  },
  "/api/private/project_kanban/restore": {
    "method": "PUT"
  },
  "/api/private/project_kanban/show": {
    "method": "GET"
  },
  "/api/private/project_kanban/store": {
    "method": "POST"
  },
  "/api/private/project_kanban/trash": {
    "method": "GET"
  },
  "/api/private/project_member/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_member/index": {
    "method": "GET"
  },
  "/api/private/project_member/restore": {
    "method": "PUT"
  },
  "/api/private/project_member/store": {
    "method": "POST"
  },
  "/api/private/project_member/trash": {
    "method": "GET"
  },
  "/api/private/project_tool/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_tool/index": {
    "method": "GET"
  },
  "/api/private/project_tool/restore": {
    "method": "PUT"
  },
  "/api/private/project_tool/store": {
    "method": "POST"
  },
  "/api/private/project_tool/trash": {
    "method": "GET"
  },
  "/api/private/project_tool/update": {
    "method": "PUT"
  },
  "/api/private/project_version/destroy": {
    "method": "DELETE"
  },
  "/api/private/project_version/index": {
    "method": "GET"
  },
  "/api/private/project_version/restore": {
    "method": "PUT"
  },
  "/api/private/project_version/show": {
    "method": "GET"
  },
  "/api/private/project_version/store": {
    "method": "POST"
  },
  "/api/private/project_version/trash": {
    "method": "GET"
  },
  "/api/private/project_version/update": {
    "method": "PUT"
  },
  "/api/private/project/destroy": {
    "method": "DELETE"
  },
  "/api/private/project/index": {
    "method": "GET"
  },
  "/api/private/project/many": {
    "method": "PUT"
  },
  "/api/private/project/restore": {
    "method": "PUT"
  },
  "/api/private/project/show": {
    "method": "GET"
  },
  "/api/private/project/store": {
    "method": "POST"
  },
  "/api/private/project/trash": {
    "method": "GET"
  },
  "/api/private/project/update": {
    "method": "PUT"
  },
  "/api/private/role/destroy": {
    "method": "DELETE"
  },
  "/api/private/role/index": {
    "method": "GET"
  },
  "/api/private/role/many": {
    "method": "PUT"
  },
  "/api/private/role/restore": {
    "method": "PUT"
  },
  "/api/private/role/show": {
    "method": "GET"
  },
  "/api/private/role/store": {
    "method": "POST"
  },
  "/api/private/role/trash": {
    "method": "GET"
  },
  "/api/private/role/update": {
    "method": "PUT"
  },
  "/api/private/subscription/index": {
    "method": "GET"
  },
  "/api/private/subscription/show": {
    "method": "GET"
  },
  "/api/private/subscription/update": {
    "method": "POST"
  },
  "/api/private/user_two_auth_code/confirm": {
    "method": "POST"
  },
  "/api/private/user_two_auth_code/store": {
    "method": "POST"
  },
  "/api/private/user_two_auth/confirm": {
    "method": "POST"
  },
  "/api/private/user_two_auth/destroy": {
    "method": "PUT"
  },
  "/api/private/user_two_auth/resend": {
    "method": "GET"
  },
  "/api/private/user_two_auth/store": {
    "method": "POST"
  },
  "/api/private/user_two_auth/update": {
    "method": "PUT"
  },
  "/api/private/user/update": {
    "method": "PUT"
  },
  "/api/private/vectorize/destroy": {
    "method": "PUT"
  },
  "/api/private/vectorize/update": {
    "method": "PUT"
  },
  "/api/private/work_type/destroy": {
    "method": "DELETE"
  },
  "/api/private/work_type/index": {
    "method": "GET"
  },
  "/api/private/work_type/many": {
    "method": "PUT"
  },
  "/api/private/work_type/restore": {
    "method": "PUT"
  },
  "/api/private/work_type/show": {
    "method": "GET"
  },
  "/api/private/work_type/store": {
    "method": "POST"
  },
  "/api/private/work_type/trash": {
    "method": "GET"
  },
  "/api/private/work_type/update": {
    "method": "PUT"
  },
  "/api/public/action/index": {
    "method": "GET"
  },
  "/api/public/auth/login": {
    "method": "POST"
  },
  "/api/public/auth/recovery": {
    "method": "POST"
  },
  "/api/public/auth/reset": {
    "method": "POST"
  },
  "/api/public/google/callback": {
    "method": "GET"
  },
  "/api/public/google/login": {
    "method": "GET"
  },
  "/api/public/google/me": {
    "method": "GET"
  },
  "/api/public/module/index": {
    "method": "GET"
  },
  "/api/public/plan/index": {
    "method": "GET"
  },
  "/api/public/user/store": {
    "method": "POST"
  },
  "/integration/private/client/destroy": {
    "method": "DELETE"
  },
  "/integration/private/client/index": {
    "method": "GET"
  },
  "/integration/private/client/many": {
    "method": "PUT"
  },
  "/integration/private/client/restore": {
    "method": "PUT"
  },
  "/integration/private/client/show": {
    "method": "GET"
  },
  "/integration/private/client/store": {
    "method": "POST"
  },
  "/integration/private/client/trash": {
    "method": "GET"
  },
  "/integration/private/client/update": {
    "method": "PUT"
  },
  "/manager/private/action/index": {
    "method": "GET"
  },
  "/manager/private/action/store": {
    "method": "POST"
  },
  "/manager/private/action/update": {
    "method": "PUT"
  },
  "/manager/private/auth/code": {
    "method": "PUT"
  },
  "/manager/private/auth/confirm": {
    "method": "GET"
  },
  "/manager/private/auth/need_reset": {
    "method": "POST"
  },
  "/manager/private/auth/reset": {
    "method": "POST"
  },
  "/manager/private/billing_error/index": {
    "method": "GET"
  },
  "/manager/private/company/index": {
    "method": "GET"
  },
  "/manager/private/feature/index": {
    "method": "GET"
  },
  "/manager/private/feature/store": {
    "method": "POST"
  },
  "/manager/private/feature/update": {
    "method": "PUT"
  },
  "/manager/private/module/index": {
    "method": "GET"
  },
  "/manager/private/module/store": {
    "method": "POST"
  },
  "/manager/private/module/update": {
    "method": "PUT"
  },
  "/manager/private/plan_feature_action/destroy": {
    "method": "DELETE"
  },
  "/manager/private/plan_feature_action/store": {
    "method": "POST"
  },
  "/manager/private/plan_feature/destroy": {
    "method": "DELETE"
  },
  "/manager/private/plan_feature/store": {
    "method": "POST"
  },
  "/manager/private/plan/index": {
    "method": "GET"
  },
  "/manager/private/plan/show": {
    "method": "GET"
  },
  "/manager/private/plan/store": {
    "method": "POST"
  },
  "/manager/private/plan/update": {
    "method": "PUT"
  },
  "/manager/public/auth/login": {
    "method": "POST"
  },
  "/manager/public/auth/recovery": {
    "method": "POST"
  },
  "/manager/public/auth/reset": {
    "method": "POST"
  }
} as const;

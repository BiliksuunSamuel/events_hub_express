import moment from "moment";

export enum PostRoutes {
  account_login = "/api/user/login",
  account_register = "/api/user/register",
  email_authentication = "/api/user/email/verify",
  events_add = "/api/event/add",
  user_status_update = "/api/user/status/update",
  event_status_update = "/api/event/status/update",
  event_info_update = "/api/event/update",
  admin_login = "/api/admin/login",
  admin_register = "/api/admin/register",
  event_delete = "/api/event/delete",
  user_password_change = "/api/user/password/change",
  admin_password_change = "/api/admin/password/change",
  user_password_reset = "/api/user/password/reset",
  amdin_account_update = "/api/admin/account/update",
  user_comments_add = "/api/user/comment/add",
}

export const GetRoutes = {
  events_get: `/api/events/get`,
  users_get: "/api/users/get",
  accounts_get: `/api/admin/accounts/get`,
};

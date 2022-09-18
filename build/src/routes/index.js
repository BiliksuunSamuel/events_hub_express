"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoutes = exports.PostRoutes = void 0;
var PostRoutes;
(function (PostRoutes) {
    PostRoutes["account_login"] = "/api/user/login";
    PostRoutes["account_register"] = "/api/user/register";
    PostRoutes["email_authentication"] = "/api/user/email/verify";
    PostRoutes["events_add"] = "/api/event/add";
    PostRoutes["user_status_update"] = "/api/user/status/update";
    PostRoutes["event_status_update"] = "/api/event/status/update";
    PostRoutes["event_info_update"] = "/api/event/update";
    PostRoutes["admin_login"] = "/api/admin/login";
    PostRoutes["admin_register"] = "/api/admin/register";
    PostRoutes["event_delete"] = "/api/event/delete";
    PostRoutes["user_password_change"] = "/api/user/password/change";
    PostRoutes["admin_password_change"] = "/api/admin/password/change";
    PostRoutes["user_password_reset"] = "/api/user/password/reset";
    PostRoutes["amdin_account_update"] = "/api/admin/account/update";
    PostRoutes["user_comments_add"] = "/api/user/comment/add";
})(PostRoutes = exports.PostRoutes || (exports.PostRoutes = {}));
exports.GetRoutes = {
    events_get: `/api/events/get`,
    users_get: "/api/users/get",
    accounts_get: `/api/admin/accounts/get`,
    get_user_by_email: "/api/user/get/?email",
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const routes_1 = require("../routes");
//
describe(`GET ${routes_1.GetRoutes.events_get}`, () => {
    describe("get saved events", () => {
        test("should respond back with status codes of 200, and content type should be json", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(routes_1.GetRoutes.events_get);
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("application/json"));
        }));
    });
});
describe(`GET ${routes_1.GetRoutes.accounts_get}`, () => {
    describe("get saved accounts", () => {
        test("should respond back with status codes of 200, and content type should be json", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(routes_1.GetRoutes.accounts_get);
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("application/json"));
        }));
    });
});
//
describe(`POST ${routes_1.PostRoutes.account_register}`, () => {
    describe("Add New User", () => {
        test("Should Return A UserInfo ", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(routes_1.PostRoutes.account_register)
                .send({
                role: 0,
                status: 1,
                username: "bhills",
                email: "bhills@gmail.com",
                password: "12345678",
            });
            console.log(response.headers);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("text/html; charset=utf-8"));
        }));
    });
    //if validation failed;
    describe("when validation failed of the user info", () => {
        test("should respond with a status code of 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(routes_1.PostRoutes.account_register)
                .send({
                username: "sam",
            });
            expect(response.statusCode).toBe(401);
        }));
    });
});

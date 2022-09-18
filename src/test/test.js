import request from "supertest";
import app from "../app";
import { GetRoutes, PostRoutes } from "../routes";

//
describe(`GET ${GetRoutes.events_get}`, () => {
  describe("get saved events", () => {
    test("should respond back with status codes of 200, and content type should be json", async () => {
      const response = await request(app).get(GetRoutes.events_get);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("application/json")
      );
    });
  });
});

describe(`GET ${GetRoutes.accounts_get}`, () => {
  describe("get saved accounts", () => {
    test("should respond back with status codes of 200, and content type should be json", async () => {
      const response = await request(app).get(GetRoutes.accounts_get);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("application/json")
      );
    });
  });
});

//
describe(`POST ${PostRoutes.account_register}`, () => {
  describe("Add New User", () => {
    test("Should Return A UserInfo ", async () => {
      const response = await request(app)
        .post(PostRoutes.account_register)
        .send({
          role: 0,
          status: 1,
          username: "bhills",
          email: "bhills@gmail.com",
          password: "12345678",
        });
      console.log(response.headers);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text/html; charset=utf-8")
      );
    });
  });
  //if validation failed;
  describe("when validation failed of the user info", () => {
    test("should respond with a status code of 404", async () => {
      const response = await request(app)
        .post(PostRoutes.account_register)
        .send({
          username: "sam",
        });
      expect(response.statusCode).toBe(401);
    });
  });
});

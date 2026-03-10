import request from "supertest";
import { app } from "../src/app";

describe("Auth protection", () => {
  it("returns 401 without token", async () => {
    const res = await request(app).get("/student/me/grades");
    expect(res.status).toBe(401);
  });
});

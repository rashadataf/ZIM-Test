import request from "supertest";

const baseUrl = "http://localhost:3500";

describe("Chunks", () => {
  it("GET /api/chunks should return a 200 status code", async () => {
    const response = await request(baseUrl).get("/api/chunks");
    expect(response.statusCode).toBe(200);
  });
  it("GET /api/chunks if email is not exists in database   ==>  empty array of chunks", async () => {
    const response = await request(baseUrl)
      .get("/api/chunks")
      .query("email=test@gmail.com");
    expect(response.body).toMatchObject({
      chunks: [],
    });
  });
  it("POST /chunks   ==>  add chunk to favorite list in database with validation error", async () => {
    const response = await request(baseUrl).post("/api/chunks").send({
      email: "rashad@gmail.com",
      url: "",
      value: "kakaka",
      icon_url: "msnsh",
      id: "",
    });
    expect(response.body).toMatchObject({
      error: expect.stringContaining("validation failed"),
    });
  });
});

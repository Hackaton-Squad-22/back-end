const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("Testando o verbo GET da API", () => {
  const newUser = {
    email: "unit@test.com",
    password: "12345",
    role: "user",
    cursosIniciados: [],
    cursosFinalizados: [],
  };

  describe("Retorna os usuários cadastrados", () => {
    beforeAll(async () => {
      await request(baseURL).post("/users").send(newUser);

    });
    afterAll(async () => {
      const id = (await request(baseURL).get('/users')).body.splice(-1)[0]._id
      await request(baseURL).delete(`/users/${id}`);
    });
    it("Deve retornar status 200", async () => {
      const response = await request(baseURL).get("/users");
      expect(response.statusCode).toBe(200);
    });
    it("Deve retornar todos os usuários cadastrados", async () => {
      const response = await request(baseURL).get("/users");
      expect(response.body.length > 0).toBe(true);
    });
    it("Deve retornar status 200", async () => {
      const id = (await request(baseURL).get('/users')).body.splice(-1)[0]._id
      const response = await request(baseURL).get(`/users/${id}`);
      expect(response.statusCode).toBe(200);
    });
    it("Deve retornar um único usuário", async () => {
      const id = (await request(baseURL).get('/users')).body.splice(-1)[0]._id
      const response = await request(baseURL).get(`/users/${id}`);
      expect(response.body.length > 0).not.toBe(true);
    });
  });
});

const request = require("supertest");
const baseURL = "http://localhost:4000"

describe('Retorna todos usuários cadastrados', () => {
  const newUser = {
    id: "dah34hr7dsakda9183",
    data: "01-01-1999",
    email: "teste@teste.com",
    password: "12345",
    role: "user",
    cursosIniciados: [],
    cursosFinalizados: [],
  }
  beforeAll(async () => {
    await request(baseURL).post("/users").send(newUser);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/users/${newUser.id}`);
  });
  it("Deve retornar status 200", async () => {
    const response = await request(baseURL).get("/users");
    expect(response.statusCode).toBe(200);
  });
  it("Deve retornar os usuários cadastrados", async () => {
    const response = await request(baseURL).get("/users");
    expect(response.body.length > 0).toBe(true);
  });
});



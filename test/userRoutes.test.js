const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("Testando o fluxo de rotas da API", () => {
  const newUser = {
    email: "unit@test.com",
    password: "12345",
    role: "user",
    cursosIniciados: [],
    cursosFinalizados: [],
  };

  describe("Testando o método GET", () => {
    describe("Retorna os usuários cadastrados", () => {
      beforeAll(async () => {
        await request(baseURL).post("/users").send(newUser);
      });
      afterAll(async () => {
        const id = (await request(baseURL).get("/users")).body.splice(-1)[0]
          ._id;
        await request(baseURL).delete(`/users/${id}`);
      });
      /* Endpoint /users, retornando todos os usuários */
      it("Deve retornar status 200", async () => {
        const response = await request(baseURL).get("/users");
        expect(response.statusCode).toBe(200);
      });
      it("Deve retornar todos os usuários cadastrados", async () => {
        const response = await request(baseURL).get("/users");
        expect(response.body.length > 0).toBe(true);
      });
      /* Endpoint /users/:id, retornando um usuário específico */
      it("Deve retornar status 200", async () => {
        const id = (await request(baseURL).get("/users")).body.splice(-1)[0]
          ._id;
        const response = await request(baseURL).get(`/users/${id}`);
        expect(response.statusCode).toBe(200);
      });
      it("Deve retornar um único usuário", async () => {
        const id = (await request(baseURL).get("/users")).body.splice(-1)[0]
          ._id;
        const response = await request(baseURL).get(`/users/${id}`);
        expect(response.body._id != "").toBe(true);
        expect(response.body.email != "").toBe(true);
        expect(response.body.password != "").toBe(true);
        expect(response.body.role != "").toBe(true);
        expect(response.body.length > 0).not.toBe(true);
      });
      /* Endpoint /user, retornando os usuários com role: "user" e com os cursosIniciados populados */
      it("Deve retornar status 200", async () => {
        const response = await request(baseURL).get(`/user`);
        expect(response.statusCode).toBe(200);
      });
      it("Deve retornar somente usuários", async () => {
        const response = await request(baseURL).get(`/user/`);
        expect(response.body[0].role).toBe("user");
      });
      it("Deve retornar somente usuários", async () => {
        const response = await request(baseURL).get(`/user/`);
        expect(response.body.splice(-1)[0].role).toBe("user");
      });
    });
  });

  describe("Testando o método POST", () => {
    describe("Cadastra um novo usuário", () => {
      afterAll(async () => {
        const id = (await request(baseURL).get("/users")).body.splice(-1)[0]
          ._id;
        await request(baseURL).delete(`/users/${id}`);
      });
      it("Deve cadastrar um novo usuário", async () => {
        const beforeData = await (await request(baseURL).get("/users")).body;
        const response = await request(baseURL).post("/users").send(newUser);
        const afterData = await (await request(baseURL).get("/users")).body;
        expect(beforeData.length < afterData.length).toBe(true);
        expect(response.statusCode).toBe(200);
      });
    });

    describe("Cadastra um novo curso acessado pelo usuário", () => {
      beforeAll(async () => {
        await request(baseURL).post("/users").send(newUser);
      });
      afterAll(async () => {
        const id = (await request(baseURL).get("/users")).body.splice(-1)[0]._id;
        await request(baseURL).delete(`/users/${id}`);
      });
      it("Deve cadastrar um novo curso do usuário", async () => {
        const userId = (await request(baseURL).get("/users")).body.splice(-1)[0]._id;
        const cursoId = (await request(baseURL).get("/fullstacks")).body[0]._id;
        const newCurso = { cursosIniciados: cursoId };
        const response = await request(baseURL)
          .post(`/users/${userId}`)
          .send(newCurso);
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Curso adicionado.");
      });
    });
  });

  describe("Testando o método PUT", () => {
    describe("Altera os dados de cadastro dos usuários", () => {
      beforeAll(async () => {
        await request(baseURL).post("/users").send(newUser);
      });
      afterAll(async () => {
        const id = (await request(baseURL).get("/users")).body.splice(-1)[0]
          ._id;
        await request(baseURL).delete(`/users/${id}`);
      });
      it("Deve alterar os dados de cadastro", async () => {
        const userId = (await request(baseURL).get("/users")).body.splice(-1)[0]
          ._id;
        const alterUser = { password: "abcde" };
        const response = await request(baseURL)
          .put(`/users/${userId}`)
          .send(alterUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Usuário atualizado com sucesso");
      });
    });
  });

  describe("Testando o método DELETE", () => {
    describe("Deleta os dados de um usuário cadastrado", () => {
      beforeAll(async () => {
        await request(baseURL).post("/users").send(newUser);
      });
      it("Deve deletar os dados de cadastro", async () => {
        const userId = (await request(baseURL).get("/users")).body.splice(-1)[0]
          ._id;
        const response = await request(baseURL).delete(`/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length > 0).toBe(false);
      });
    });
  });
});

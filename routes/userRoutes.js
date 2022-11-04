import express from "express";
import users from "../models/User.js";

let userRoutes = express.Router();

userRoutes
  .get("/users", (req, res) => {
    users.find((err, users) => {
      res.status(200).send(users);
    });
  })

  .get("/users/:id", (req, res) => {
    const id = req.params.id;
    users.findById(id, "-password", (err, users) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do usuário." });
      } else {
        res.status(200).json(users);
      }
    });
  })

  // Usaremos essa rota sempre que quisermos pegar as informações dos cursos linkando pelo id deles
  .get("/user", (req, res) => {
    users.aggregate(
      [
        {
          $lookup: {
            from: "cursosfullstacks",
            localField: "cursosIniciados",
            foreignField: "_id",
            as: "cursosIniciados",
          },
        },
        {
          $unwind: {
            path: "$cursosIniciados",
          },
        },
/*         {
          $match: {
            "cursosIniciados.autor": "PM3",
          },
        }, */
      ],
      (err, users) => {
        if (err) {
          res.status(400).json({ msg: "Falha ao encontrar id do usuário." });
        } else {
          res.status(200).json(users);
        }
      }
    );
  })

  .post("/users", (req, res) => {
    const user = new users({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      cursos: [],
      date: new Date(),
    });
    user.save((err, users) => {
      if (err) {
        res.status(400).json({ msg: "Erro ao adicionar o novo usuário." });
      } else {
        res.status(200).json({ users });
      }
    });
  })

  .post("/users/:id", (req, res) => {
    const id = req.params.id;
    users.findByIdAndUpdate(id, req.body, (err, users) => {
      if (err) {
        res
          .status(400)
          .json({ msg: "Erro ao adicionar o curso para o usuário." });
      } else {
        res.status(200).json({ users });
      }
    });
  })

  .put("/users/:id", (req, res) => {
    const id = req.params.id;
    users.findByIdAndUpdate(id, req.body, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do usuário" });
      } else {
        res.status(200).send({ msg: "Usuário atualizado com sucesso" });
      }
    });
  })

  .delete("/users/:id", (req, res) => {
    const id = req.params.id;
    users.findByIdAndRemove(id, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do usuário" });
      } else {
        res.status(200).json({ msg: "Usuário removido." });
      }
    });
  });

export default userRoutes;

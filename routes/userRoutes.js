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

  .post("/users", (req, res) => {
    const user = new users({
      id: req.body.nome,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    user.save((err, users) => {
      res.status(200).json({ users });
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

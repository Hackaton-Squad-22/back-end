import express from "express";
import cursosqa from "../models/Qa.js";

let qaRoutes = express.Router();

qaRoutes
  .get("/qa", (req, res) => {
    cursosqa.find((err, cursosqa) => {
      res.status(200).send(cursosqa);
    });
  })

  .get("/qa/:id", (req, res) => {
    const id = req.params.id;
    cursosqa.findById(id, (err, cursosqa) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso." });
      } else {
        res.status(200).json(cursosqa);
      }
    });
  })

  .post("/qa", (req, res) => {
    const user = new cursosqa({
      data: new Date(),
      curso: req.body.curso,
      duracao: req.body.duracao,
      trilha: req.body.trilha,
    });
    user.save((err, cursosqa) => {
      if (err) {
        res.status(400).json({ msg: "Erro ao adicionar o novo curso." });
      } else {
        res.status(200).json({ cursosqa });
      }
    });
  })

  .put("/qa/:id", (req, res) => {
    const id = req.params.id;
    cursosqa.findByIdAndUpdate(id, req.body, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso" });
      } else {
        res.status(200).send({ msg: "Curso atualizado com sucesso" });
      }
    });
  })

  .delete("/qa/:id", (req, res) => {
    const id = req.params.id;
    cursosqa.findByIdAndRemove(id, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso" });
      } else {
        res.status(200).json({ msg: "Curso removido." });
      }
    });
  });

export default qaRoutes;

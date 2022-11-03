import express from "express";
import cursosux from "../models/Ux.js";

let uxRoutes = express.Router();

uxRoutes
  .get("/ux", (req, res) => {
    cursosux.find((err, cursosux) => {
      res.status(200).send(cursosux);
    });
  })

  .get("/ux/:id", (req, res) => {
    const id = req.params.id;
    cursosux.findById(id, (err, cursosux) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso." });
      } else {
        res.status(200).json(cursosux);
      }
    });
  })

  .post("/ux", (req, res) => {
    const user = new cursosux({
      data: new Date(),
      curso: req.body.curso,
      duracao: req.body.duracao,
      tipo: req.body.tipo,
      autor: req.body.autor,
      url: req.body.url,
      trilha: req.body.trilha,
    });
    user.save((err, cursosux) => {
      if (err) {
        res.status(400).json({ msg: "Erro ao adicionar o novo curso." });
      } else {
        res.status(200).json({ cursosux });
      }
    });
  })

  .put("/ux/:id", (req, res) => {
    const id = req.params.id;
    cursosux.findByIdAndUpdate(id, req.body, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso" });
      } else {
        res.status(200).send({ msg: "Curso atualizado com sucesso" });
      }
    });
  })

  .delete("/ux/:id", (req, res) => {
    const id = req.params.id;
    cursosux.findByIdAndRemove(id, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso" });
      } else {
        res.status(200).json({ msg: "Curso removido." });
      }
    });
  });

export default uxRoutes;

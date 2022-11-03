import express from "express";
import cursosfullstacks from "../models/Fullstacks.js";

let fullstacksRoutes = express.Router();

fullstacksRoutes
  .get("/fullstacks", (req, res) => {
    cursosfullstacks.find((err, cursosfullstacks) => {
      res.status(200).send(cursosfullstacks);
    });
  })

  .get("/fullstacks/:id", (req, res) => {
    const id = req.params.id;
    cursosfullstacks.findById(id, (err, cursosfullstacks) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso." });
      } else {
        res.status(200).json(cursosfullstacks);
      }
    });
  })

  .post("/fullstacks", (req, res) => {
    const user = new cursosfullstacks({
      data: new Date(),
      curso: req.body.curso,
      duracao: req.body.duracao,
      tipo: req.body.tipo,
      autor: req.body.autor,
      url: req.body.url,
      trilha: req.body.trilha,
      modulo: req.body.modulo
    });
    user.save((err, cursosfullstacks) => {
      if (err) {
        res.status(400).json({ msg: "Erro ao adicionar o novo curso." });
      } else {
        res.status(200).json({ cursosfullstacks });
      }
    });
  })

  .put("/fullstacks/:id", (req, res) => {
    const id = req.params.id;
    cursosfullstacks.findByIdAndUpdate(id, req.body, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso" });
      } else {
        res.status(200).send({ msg: "Curso atualizado com sucesso" });
      }
    });
  })

  .delete("/fullstacks/:id", (req, res) => {
    const id = req.params.id;
    cursosfullstacks.findByIdAndRemove(id, (err) => {
      if (err) {
        res.status(400).json({ msg: "Falha ao encontrar id do curso" });
      } else {
        res.status(200).json({ msg: "Curso removido." });
      }
    });
  });

export default fullstacksRoutes;

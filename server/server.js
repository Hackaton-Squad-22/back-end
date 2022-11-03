import express from "express";
import app from "../app.js";
import fullstacksRoutes from "../routes/fullstacksRoutes.js";
import userRoutes from "../routes/userRoutes.js";


import loginController from "../controllers/loginController.js";

app.listen(4000, () =>
  console.log("App escutando na porta http://localhost:4000")
);

app.get("/", (req, res) => {
  res.status(200).send("Testando método GET");
});

app.use(express.json(), userRoutes, fullstacksRoutes);
app.use('/login', loginController)
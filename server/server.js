import express from "express";
import app from "../app.js";
import fullstacksRoutes from "../routes/fullstacksRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import loginController from "../controllers/loginController.js";
import qaRoutes from "../routes/qaRoutes.js";
import uxRoutes from "../routes/uxRoutes.js";

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>
  console.log(`App escutando na porta http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  res.status(200).send("Testando método GET");
});

app.use(express.json(), userRoutes, fullstacksRoutes, qaRoutes, uxRoutes);
app.use('/login', loginController)

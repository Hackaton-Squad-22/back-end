import express from "express";
import cors from "cors"
import db from "./config/dbConnect.js";

db.on("error", console.log.bind("Erro de conexão"))
db.once("open", () => console.log("Conexão estabelecida com sucesso"))

const app = express();
app.use(cors())


export default app
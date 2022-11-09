import mongoose from "mongoose";

const qaSchema = new mongoose.Schema({
  id: { type: String },
  data: { type: Date },
  curso: { type: String, require: true },
  duracao: { type: String, require: true },
  tipo: { type: String, require: true },
  autor: { type: String, require: true },
  url: { type: String, require: true },
  trilha: { type: String },
  modulo: { type: String },
});

const cursosqa = mongoose.model("cursosqa", qaSchema);

export default cursosqa;

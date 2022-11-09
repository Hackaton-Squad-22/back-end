import mongoose from "mongoose";

const uxSchema = new mongoose.Schema({
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

const cursosux = mongoose.model("cursosux", uxSchema);

export default cursosux;

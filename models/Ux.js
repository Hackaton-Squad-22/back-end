import mongoose from "mongoose";

const uxSchema = new mongoose.Schema({
  id: { type: String },
  data: { type: Date },
  curso: { type: String, require: true },
  duracao: { type: String },
  trilha: { type: String },
});

const cursosux = mongoose.model("cursosux", uxSchema);

export default cursosux;

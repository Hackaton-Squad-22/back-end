import mongoose from "mongoose";

const qaSchema = new mongoose.Schema({
  id: { type: String },
  data: { type: Date },
  curso: { type: String, require: true },
  duracao: { type: String },
  trilha: { type: String },
});

const cursosqa = mongoose.model("cursosqa", qaSchema);

export default cursosqa;

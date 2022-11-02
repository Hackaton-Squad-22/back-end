import mongoose from "mongoose";

const fullstacksSchema = new mongoose.Schema({
  id: { type: String },
  data: { type: Date },
  curso: { type: String, require: true },
  duracao: { type: String },
  trilha: { type: String },
});

const cursosfullstacks = mongoose.model("cursosfullstacks", fullstacksSchema);

export default cursosfullstacks;

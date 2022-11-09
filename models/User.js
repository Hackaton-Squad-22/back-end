import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String },
  data: { type: Date },
  nome: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String },
  cursosFullstacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "cursosfullstacks" }],
  cursosQa: [{ type: mongoose.Schema.Types.ObjectId, ref: "cursosqa" }],
  cursosUx: [{ type: mongoose.Schema.Types.ObjectId, ref: "cursosux" }],
});

const users = mongoose.model("users", userSchema);

export default users;

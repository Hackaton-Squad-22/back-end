import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String },
  data: { type: Date },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String },
  cursosIniciados: [{ type: mongoose.Schema.Types.ObjectId, ref: "cursosfullstacks" }],
  cursosFinalizados: [{ type: mongoose.Schema.Types.ObjectId, ref: "cursosfullstacks" }],
});

const users = mongoose.model("users", userSchema);

export default users;

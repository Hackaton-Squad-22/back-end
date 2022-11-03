import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String },
  data: { type: Date },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String },
  cursosIniciados: { type: Array },
  cursosFinalizados: { type: Array },

});

const users = mongoose.model("users", userSchema);

export default users;

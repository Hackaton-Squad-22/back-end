import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://squad22:1234@hackaton.lkilm5i.mongodb.net/"
); 

const db = mongoose.connection

export default db
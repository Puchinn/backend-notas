require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

console.log("conectando a la base de datos...");

mongoose
  .connect(url)
  .then(() => console.log("conectado exitosamente"))
  .catch(() => console.log("ocurrio un error al intentar conectar"));

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: [5, "demasiado corto"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

const Nota = mongoose.model("Nota", noteSchema);
module.exports = Nota;

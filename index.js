require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const Nota = require("./models");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/api/notas", (req, res) => {
  Nota.find({}).then((notas) => {
    res.json(notas);
  });
});

app.post("/api/notas", (req, res, next) => {
  const nota = req.body;

  const nuevaNota = new Nota({
    content: nota.content,
    date: new Date(),
    important: nota.important || false,
  });

  nuevaNota
    .save()
    .then((nota) => res.json(nota))
    .catch((error) => {
      next(error);
    });
});

app.get("/api/notas/:id", (req, res, next) => {
  const id = req.params.id;
  Nota.findById(id)
    .then((nota) => res.json(nota))
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "mal formato de id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }
};

app.use(errorHandler);

app.listen(port);

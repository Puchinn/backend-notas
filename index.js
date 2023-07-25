const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const generarId = () => {
  const maxId = notes[notes.length - 1] ? notes[notes.length - 1].id : 0;
  return maxId + 1;
};

app.get("/api/notas", (req, res) => {
  res.json(notes);
});

app.listen(port);

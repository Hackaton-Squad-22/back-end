import express from "express";
let lista = [];

const app = express();
app.listen(4000, () =>
  console.log("App escutando na porta http://localhost:4000")
);

app.get("/", (req, res) => {
  res.status(200).send("Testando método GET");
});

app.get("/cursos", (req, res) => {
  res.status(200).send(lista);
});

app.post("/cursos", (req, res) => {
  lista.push({ teste: "testando", id: "1" });
  res.status(200).json({ "Dados cadastrados:": lista });
});

app.put("/cursos/:id", (req, res) => {
  lista.forEach((elemento) => {
    if (elemento.id === req.params.id) {
      elemento = req.body
    }
    res.status(200).json(lista); 
  });
});

app.delete("/cursos/:id", (req, res) => {
  lista.forEach((elemento, index) => {
    if (elemento.id === req.params.id) {
      lista.splice(index, 1)
    }
    res.status(200).json(lista); 
  });
});

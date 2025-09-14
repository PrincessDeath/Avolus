const express = require("express"); // Importa o express.
const path = require("path");
const app = express(); // app = aplicação.

let users = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//rota de cadastro
app.post("/api/register", (req, res) => {
  const { email, nickname, password } = req.body;
  users.push({ email, nickname, password });
  res.json({ message: "Usuário cadastrado com sucesso" });
});

//rota de login
app.post("/api/register", (req, res) => {
  const { email, nickname, password } = req.body;
  //verificar se o usuario já existe
  const user = users.find((u) => u.email === email || u.nickname === nickname && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
  res.json({ message: "Login bem sucedido" });
});

module.exports = app;

const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../Controllers/users"); // importa funções do controller de usuários

const router = express.Router(); // cria o roteador que vai cuidar das rotas relacionadas aos usuários

// define as rotas principais da API
router.get("/", getUsers); // pega todos os usuários
router.post("/", addUser); // adiciona um novo usuário
router.put("/:id", updateUser); // atualiza os dados de um usuário específico
router.delete("/:id", deleteUser); // deleta um usuário específico

module.exports = router; // exporta o roteador pra ser usado no servidor principal

// rota de teste simples só pra verificar se a conexão com o banco tá de pé
router.get("/teste", (_, res) => {
  db.query("SELECT 1", (err) => {
    if (err) return res.status(500).send("Erro na conexão");
    return res.send("Conexão OK!");
  });
});

const { db } = require("../db");

// função auxiliar que só dá uma conferida se todos os campos foram preenchidos
const camposObrigatoriosPreenchidos = ({ nome, idade, favorito, personagemfav }) => {
  return nome && idade && favorito && personagemfav;
};

// pega todo mundo que tá cadastrado
const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar usuários", detalhes: err });
    return res.status(200).json(data);
  });
};

// Cadastra um novo usuário bonitinho
const addUser = (req, res) => {
  const { nome, idade, favorito, personagemfav } = req.body;

  // validação básica: se esquecer algum campo, já avisa
  if (!camposObrigatoriosPreenchidos(req.body)) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  const q = "INSERT INTO usuarios (nome, idade, favorito, personagemfav) VALUES (?, ?, ?, ?)";
  db.query(q, [nome, idade, favorito, personagemfav], (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao adicionar usuário", detalhes: err });
    return res.status(201).json({ message: "Usuário adicionado com sucesso!" });
  });
};

// atualiza um usuário já existente
const updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, idade, favorito, personagemfav } = req.body;

  // mesmo esquema: sem todos os campos, sem update
  if (!camposObrigatoriosPreenchidos(req.body)) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios para atualização!" });
  }

  const q = `
    UPDATE usuarios
    SET nome = ?, idade = ?, favorito = ?, personagemfav = ?
    WHERE idcadastro = ?
  `;

  db.query(q, [nome, idade, favorito, personagemfav, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar:", err);
      return res.status(500).json({ error: "Erro ao atualizar o usuário", detalhes: err });
    }
    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  });
};

// deleta um usuario existente
const deleteUser = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM usuarios WHERE idcadastro = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao deletar usuário", detalhes: err });
    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  });
};

// exporta tudo pra usar nas rotas
module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};

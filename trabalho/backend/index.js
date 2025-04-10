import { db } from "./db.js";

import express from "express";
import cors from "cors";
import userRoutes from "./Routes/users.js"; 
import dotenv from "dotenv";

dotenv.config(); // carrega variáveis do .env 

const app = express();

app.use(express.json()); // permite receber JSON nas requisições 
app.use(cors()); // libera o CORS pra conseguir acessar essa API do frontend 

app.use("/api/usuarios", userRoutes); // define a rota base pra tudo relacionado a usuarios

// sobe o servidor na porta 8800
app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});

// tenta conectar com o banco e avisa se deu bom ou ruim
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados com sucesso!");
  }
});

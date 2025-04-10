import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config(); // carrega as variáveis de ambiente do .env (tipo host, user, senha)

// aqui cria a conexão com o banco usando os dados que estão no .env
const db = mysql.createConnection({
  host: process.env.DB_HOST, // endereço do banco 
  user: process.env.DB_USER, // usuário do banco
  password: process.env.DB_PASSWORD, // senha do banco
  database: process.env.DB_NAME, // nome do banco 
});

// testa a conexão logo de cara, só pra garantir que ta tudo certo
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados com sucesso!");
  }
});

// exporta essa conexão pra ser usada em outras partes da aplicação
export { db };

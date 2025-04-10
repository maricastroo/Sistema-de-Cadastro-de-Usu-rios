# Sistema de Cadastro de Usuários

Este é um projeto full stack desenvolvido com **React** no frontend e **Node.js + MySQL** no backend. Ele permite o cadastro, edição, visualização e exclusão de usuários, com persistência de dados em banco de dados relacional.

## Funcionalidades
- Listagem de usuários cadastrados  
- Criação de novos cadastros via formulário  
- Edição de cadastros existentes  
- Exclusão de usuários  

## Requisitos mínimos
- Banco de Dados MySQL  
- Node.js na versão 12 ou superior  
- npm (gerenciador de pacotes do Node.js)  

## Estrutura do Projeto

O projeto está dividido em duas pastas principais: `frontend` e `backend`, separando as responsabilidades da aplicação.

```
.
├── backend
│   ├── Controllers      # Lógica das operações (listar, adicionar, editar, deletar)
│   ├── Routes           # Definição das rotas da API
│   ├── db.js            # Configuração da conexão com o MySQL
│   └── index.js         # Ponto de entrada do servidor backend
│
├── frontend
│   ├── App.jsx          # Componente principal da interface
│   ├── App.css          # Estilização da aplicação
```

Essa estrutura foi pensada para deixar o projeto organizado e facilitar futuras manutenções ou expansões.

## Como rodar o projeto

### Configurando o Banco de Dados
1. Importe o arquivo SQL no banco de dados MySQL  
2. Abra a ferramenta de gerenciamento SQL (a utilizada no projeto foi o MySQL Workbench)  
3. Crie um banco chamado `trabalhoreact`  
4. Importe o arquivo `.sql` fornecido no projeto  

### Configuração Backend  
Pelo terminal:

1. Entre na pasta utilizando:  
```
cd backend
```

2. Instale as dependências:  
```
npm install
```

3. Configure o ambiente:  
Abra o arquivo `.env` e coloque os dados conforme sua configuração:  
```
DB_HOST=localhost  
DB_USER=seu_usuario  
DB_PASSWORD=sua_senha  
DB_NAME=nome_do_banco  
```

4. Inicie o servidor backend:  
```
npx nodemon index.js
```

### Configuração Frontend

1. Em outro terminal, entre na pasta do frontend:  
```
cd frontend
```

2. Entre na pasta adicional:  
```
cd trabalho-react
```

3. Inicie o servidor do frontend:  
```
npm start
```


## Endpoints da API

Os endpoints disponíveis para interação com a API de usuários são:

### GET `/api/usuarios`
Retorna todos os usuários cadastrados.

### POST `/api/usuarios`
Adiciona um novo usuário. Espera-se um JSON com os campos:
```json
{
  "nome": "Maria",
  "idade": 25,
  "favorito": "Lua",
  "personagemfav": "Alice"
}
```

### PUT `/api/usuarios/:id`
Atualiza os dados de um usuário existente com base no `id`.

### DELETE `/api/usuarios/:id`
Remove um usuário do banco com base no `id`.

### GET `/api/usuarios/teste`
Rota de teste para verificar conexão com o banco de dados.


## Tecnologias Utilizadas

- **React** – Biblioteca JavaScript para construção da interface do usuário (frontend)
- **Node.js** – Ambiente de execução JavaScript no backend
- **Express** – Framework para Node.js que facilita a criação da API
- **MySQL** – Sistema de gerenciamento de banco de dados relacional
- **dotenv** – Para configurar variáveis de ambiente de forma segura
- **cors** – Middleware para habilitar o compartilhamento de recursos entre diferentes origens (frontend/backend)
- **nodemon** – Ferramenta que reinicia automaticamente o servidor Node.js quando arquivos são alterados

## Soluções Propostas pelo Sistema
- **Centralização de dados**: Permite armazenar e gerenciar usuários de forma centralizada e persistente via banco de dados relacional.
- **Criação rápida de cadastros**: Interface intuitiva com formulário e feedback visual facilita o registro de novos usuários.
- **Edição e manutenção facilitadas**: Permite atualização e exclusão de dados com poucos cliques, promovendo agilidade na manutenção das informações.
- **Validação de dados de entrada**:    
  - Limita o número de caracteres em campos como nome e personagem favorito para evitar entradas inválidas.
  - Mostra erro ao tentar cadastrar ou atualizar alguém existe com um campo vazio.
 
## Solução de Problemas

- **Erro ao conectar com o banco de dados**: Verifique se o MySQL está rodando e se os dados no arquivo `.env` estão corretos.
- **Problemas com CORS**: Confirme se o middleware `cors` está habilitado no backend.
- **Frontend não encontra a API**: Verifique se a URL base da API está correta e se o backend está em execução.
- **Alterações no código não refletem**: No backend, certifique-se de estar usando `nodemon`. No frontend, tente reiniciar com `npm start`.
- **Dados não são salvos ou atualizados**: Verifique se os campos obrigatórios estão preenchidos corretamente e se não há erros de validação no console.


##Autor

Mariana de Castro

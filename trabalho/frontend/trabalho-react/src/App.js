// App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // estados principais: lista de personagens, dados do formulário e controle de exibição aqui controla o que aparece na tela e o que está sendo editado ou cadastrado
  const [personagens, setPersonagens] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    favorito: "",
    personagemfav: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  const API_URL = "http://localhost:8800/api/usuarios";

  // assim que o app carrega já busca os dados existentes no backend
  const buscarPersonagens = async () => {
    try {
      const res = await axios.get(API_URL);
      const dados = Array.isArray(res.data) ? res.data : [];
      setPersonagens(dados);
    } catch (err) {
      console.error("Erro ao buscar personagens:", err);
      setPersonagens([]);
    }
  };

  useEffect(() => {
    buscarPersonagens();
  }, []);

  // atualiza o form conforme o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // envia dados do form: se tiver ID, atualiza; se não, cria um novo registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoRegistro = { ...formData };
    try {
      if (editandoId) {
        await axios.put(`${API_URL}/${editandoId}`, novoRegistro);
      } else {
        await axios.post(API_URL, novoRegistro);
      }
      // limpa o form e fecha depois de salvar
      setFormData({ nome: "", idade: "", favorito: "", personagemfav: "" });
      setEditandoId(null);
      setModalVisivel(false);
      buscarPersonagens();
    } catch (err) {
      console.error("Erro ao salvar personagem:", err.response?.data || err.message);
    }
  };

  // abre o modal zerado pra cadastro
  const abrirFormulario = () => {
    setFormData({ nome: "", idade: "", favorito: "", personagemfav: "" });
    setEditandoId(null);
    setModoEdicao(false);
    setModalVisivel(true);
  };

  // carrega dados no formulário pra edição
  const iniciarEdicao = (usuario) => {
    setFormData({
      nome: usuario.nome,
      idade: usuario.idade,
      favorito: usuario.favorito,
      personagemfav: usuario.personagemfav,
    });
    setEditandoId(usuario.idcadastro);
    setModoEdicao(true);
    setModalVisivel(true);
  };

  // exclui o selecionado
  const deletarPersonagem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      buscarPersonagens();
    } catch (err) {
      console.error("Erro ao deletar personagem:", err.response?.data || err.message);
    }
  };

  // fecha o modal sem complicação
  const fecharModal = () => {
    setModalVisivel(false);
  };

  return (
    <div className={`container ${modalVisivel ? "modal-aberto" : ""}`}>
      <h1>CREPÚSCULO 🧛</h1>
      <h3>
        Aqui não é só apenas uma história qualquer sobre vampiros!!!!! AQUI TEMOS:<br />
      </h3>
      <p>
        Um vampiro centenário que se apaixona por uma adolescente do ensino médio (credo, mas vai entender o amor eterno né 🙄),
        um vampiro que não morre no sol MAS QUE BRILHA igual purpurina ✨✨✨✨✨<br />
        E aí, pronto pra se perder nesse (péssimo) romance com trilha sonora gótica e zero emoções (da parte da Bella)?
        Clica nos botões e entra nesse universo onde o brilho é eterno e amor questionável.
      </p>
      <button onClick={abrirFormulario}>Cadastrar Novo</button>

      <ul className="lista">
        {personagens.map((usuario) => (
          <li key={usuario.idcadastro}>
            <strong>{usuario.nome}</strong> ({usuario.idade} anos) ama <em>{usuario.favorito}</em> e seu personagem favorito é <b>{usuario.personagemfav}</b>! 🧛🏻🐺
            <div className="botoes">
              <button onClick={() => iniciarEdicao(usuario)}>✍🏻 Editar</button>
              <button onClick={() => deletarPersonagem(usuario.idcadastro)}>🚮 Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      {modalVisivel && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h2>{modoEdicao ? "Editar Cadastro" : "Novo Cadastro"}</h2>
            <form onSubmit={handleSubmit} className="formulario">
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="idade"
                placeholder="Sua idade"
                value={formData.idade}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="favorito"
                placeholder="Filme ou livro favorito"
                value={formData.favorito}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="personagemfav"
                placeholder="Personagem favorito"
                value={formData.personagemfav}
                onChange={handleChange}
                required
              />
              <div className="botoes">
                <button type="submit">{modoEdicao ? "Atualizar" : "Enviar"}</button>
                <button type="button" onClick={fecharModal}>Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

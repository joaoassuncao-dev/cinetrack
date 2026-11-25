import { useState, useEffect } from 'react'
import { listar } from './api'
import {filmesInicias, gerarId} from './data/filmes'
import ListaFilmes from './components/listafilmes'
import Header from './components/header'
import Filtros from './components/filtros'
import ModalFilme from './components/modalFilme'

export default function App() {
  
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  
  useEffect(() => {
    document.title =
      `Cinetrack (${filmes.length})`
  }, [filmes.length])

  useEffect(() => {
    listar()
      .then((dados) => setFilmes(dados))
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false))
  }, [])

  function atualizar() {
    const visiveis = filmes
      .filter((filme) =>
        status === "todos" ||
        filme.status === status)
      .filter((filme) => 
        filme.titulo
          .toLowerCase()
          .includes(busca.toLowerCase()))
    return visiveis
  }
  function adicionar(novoFilme) { 

    setFilmes((anteriores) => [
      ...anteriores,
      {
        id: gerarId(anteriores),
        ...novoFilme
        
      },
    ])

  }

  function editar(id, dados) {
    setFilmes((anteriores) => 
      anteriores.map((f) => 
        f.id === id
          ? {...f, ...dados, id}
          : f
      )
    )
  }

  function salvar(dados) {

    if (editando.id) {
      editar(editando.id, dados);
    } else {
      adicionar(dados)
    }

    setEditando(null)
  }

  function remover(id) {
    const removerFilme = filmes 
      .filter((f) => f.id !== id);
    setFilmes(removerFilme)
    atualizar()
  }

  let conteudo;
  if (carregando) {
    conteudo = <p>Carregando...</p>
  } else if (erro) {
    conteudo = (
      <p className='erro'>Erro: {erro}</p>
    )
  } else {
    conteudo = (
      <ListaFilmes 
        filmes={atualizar()}
        aoEditar={setEditando}
        aoRemover={remover}
        />
    )
  }

  return (
    <>
      <Header 
        busca = {busca}
        aoBuscar = {setBusca}
        aoAdicionar={() => setEditando({})}
      />
      <Filtros 
        ativo={status}
        aoMudar={setStatus}
      />
      <main>{conteudo}</main>
      {editando !== null && (
        <ModalFilme 
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  )

}
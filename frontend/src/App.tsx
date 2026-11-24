import { useState } from 'react'
import {filmesInicias, gerarId} from './data/filmes'
import ListaFilmes from './components/listafilmes'
import Header from './components/header'
import Filtros from './components/filtros'
import ModalFilme from './components/modalFilme'

export default function App() {
  
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState(filmesInicias);
  const [editando, setEditando] = useState(null);

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
      <ListaFilmes 
        filmes={atualizar()}
        aoEditar={setEditando}
        aoRemover={remover}
      />
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
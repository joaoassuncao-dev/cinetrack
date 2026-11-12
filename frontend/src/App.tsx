import { useState } from 'react'
import {filmes} from './data/filmes'
import ListaFilmes from './components/listafilmes'
import Header from './components/header'
import Filtros from './components/filtros'

export default function App() {
  
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
    

  const visiveis = filmes
    .filter((filme) =>
        status === "todos" ||
        filme.status === status)
    .filter((filme) => 
      filme.titulo
        .toLowerCase()
        .includes(busca.toLowerCase()))
  
  return (
    <>
      <Header 
        busca = {busca}
        aoBuscar = {setBusca}
      />
      <Filtros 
        ativo={status}
        aoMudar={setStatus}
      />
      <ListaFilmes filmes={visiveis}/>
    </>
  )

}
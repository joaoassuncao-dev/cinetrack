import { useState } from 'react'
import {filmes} from './data/filmes'
import ListaFilmes from './components/listafilmes'
import Header from './components/header'
import Filtros from './components/filtros'

export default function App() {

  return (
    <>
      <Header />
      <Filtros />
      <ListaFilmes filmes={filmes}/>
    </>
  )

}
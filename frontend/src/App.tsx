import { useState } from 'react'
import Titulo from './components/titulo'
import {filmes} from './data/filmes'
import ListaFilmes from './components/listafilmes'

export default function App() {

  return (
    <>
      <Titulo/>
      <ListaFilmes filmes={filmes}/>
    </>
  )

}
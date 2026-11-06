import { useState } from 'react'
import './App.css'
import Titulo from './components/titulo'
import {filmes} from './data/filmes'

export default function App() {

  console.log(filmes)

  return (
    <>
      <Titulo/>
    </>
  )

}


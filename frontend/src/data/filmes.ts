import filmesIniciais from './dados-exemplos.json' with { type: 'json'}

export let filmes = carregar()

function carregar()  {

    return filmesIniciais

}


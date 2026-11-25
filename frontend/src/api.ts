import { filmesInicias  } from "./data/filmes.ts";

function esperar(ms) {
    return new Promise((ok) => 
        setTimeout(ok, ms)
    )
}

export async function listar() {
    await esperar(500)
    return filmesInicias
}


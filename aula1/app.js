import filmesInicias from './dados-exemplos.json' with { type: 'json'}

// Declaração de constantes
const TOTAL = 6
const ASSISTIDOS = 3
const ASSISTINDO = 1
const QUERO = 2

// Declaração de botões do nav
const btnTodos = document.querySelector("nav button:nth-child(1)");
const btnAssistido = document.querySelector("nav button:nth-child(2)")
const btnAssistindo = document.querySelector("nav button:nth-child(3)")
const btnQuero= document.querySelector("nav button:nth-child(4)")

// Declaração do rodapé
const rodape = document.querySelector("footer small");
const lista = document.querySelector("#lista")
// const cards = lista.querySelectorAll(".card")

btnTodos.textContent += ` (${TOTAL})`
btnAssistido.textContent += ` (${ASSISTIDOS})`
btnAssistindo.textContent += ` (${ASSISTINDO})`
btnQuero.textContent += ` (${QUERO})`
rodape.textContent += ` · ${TOTAL} filmes cadastrados`

function rotuloStatus(status) {
    if(status === "assistido") {return "Assistido"};
    if(status === "assistindo") {return "Assistindo"};
    if(status === "quero") {return "Quero Assistir"}
    return status;
}

const estrelas = (nota) => {
    let resultaddo = '';
    for (let i=1; i <= 5; i++) {
        resultaddo += i <= nota ? '★' : '☆';
    }
    return resultaddo;
}

function renderCards(filmes) {
    const cards = filmes.map((f) => `
        <article class="card" data-id="${f.id}">
            <img src="${f.poster}"width="90">
            <h2>${f.titulo}</h2>
            <p>${f.ano}</p>
            <p class="nota">${estrelas(f.nota)}:</p>
            <span class="badge">${rotuloStatus(f.status)}</span>
            <p>${f.comentario}</p>
            <div class="acoes">
                <button>editar</button><button>remover</button>
            </div>
        </article>`).join("");
        lista.innerHTML = cards;
}

// for (const card of cards) {
//     // const badge = card.querySelector(".badge");
//     // const nota = card.querySelector(".nota")

//     // badge.textContent = rotuloStatus('assistindo')
//     // nota.textContent += estrelas(3)
// }

renderCards(filmesInicias)


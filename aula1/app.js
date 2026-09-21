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

// Declaracao de variaveis do modal (form-filme)
let editandoId = null
const modal = document.querySelector("#modal")
const form = document.querySelector("#form-filme")
const abrir = () => modal.hidden = false;
const fechar = () => modal.hidden = true;

document.querySelector("header button")
    .addEventListener("click", (event) => {
        editandoId = null;
        form.reset();
        abrir();
    })

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !modal.hidden) {
        fechar()
    }
})

document.querySelector(".btnCancelar")
    .addEventListener("click", () => {
        fechar()
    })

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

// renderizador dos cards na tela, cresce conforme o .json cresce
function renderCards(filmes) {
    const cards = filmes.map((f) => `
       <article class="card" data-id="${f.id}" tabindex="0" role="button" aria-expanded="false">
          <!-- Conteúdo sempre visível -->
            <img src="${f.poster}" alt="Poster de ${f.titulo}" width="90">
            <h2>${f.titulo}</h2>
            <p>${f.ano}</p>
            <p class="nota">${estrelas(f.nota)}</p>
            <span class="badge" ${f.status}>${rotuloStatus(f.status)}</span>
            <div class="acoes">
                <button>editar</button><button>remover</button>
            </div>
        </article>
      `).join("");
    lista.innerHTML = cards;

}

renderCards(filmesInicias)

function expandCards(card) {
    const expandido = card.classList.toggle('expandido');
    card.setAttribute('aria-expanded', expandido);
}

lista.addEventListener('click', (event) => {
    if (event.target.closest('button')) {
        return;
    }

    const card = event.target.closest('.card')
    if (card) {
        expandCards(card)
    }

})



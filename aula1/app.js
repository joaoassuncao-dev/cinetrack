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
const cards = lista.querySelectorAll(".card")

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

for (const card of cards) {
    const badge = card.querySelector(".badge");
    const nota = card.querySelector(".nota")

    badge.textContent = rotuloStatus('assistindo')
    nota.textContent += estrelas(3)
}
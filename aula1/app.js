import filmesInicias from './dados-exemplos.json' with { type: 'json'}

let filmes = [...filmesInicias]

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

const nav = document.querySelector("nav")

// Definicao de listeners 
document.querySelector("header button")
    .addEventListener("click", () => {
        editandoId = null;
        form.reset();
        abrir();
});

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !modal.hidden) {
        fechar()
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = 
        Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota)
    dados.status = (dados.status).toLowerCase()
    const {valido, erros} = validarFilme(dados);
    if (!valido) { 
        alert(erros.join("\n")); return; }
    criarCard(dados)
})

document.querySelector(".btnCancelar")
    .addEventListener("click", () => {
        fechar()
});

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;
    nav.querySelector(".ativo")
        .classList.remove("ativo")
    botao.classList.add("ativo")
    const status = botao.dataset.status;
    renderizarCards(filmes.filter((f) => 
        status === "todos" || f.status === status))
});

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover")
    if (!botao) return;
    if (!confirm("Remover este filme?")) return;
    const card = botao.closest(".card")
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id)
    renderizarCards(filmes);
});

btnTodos.textContent += ` (${TOTAL})`
btnAssistido.textContent += ` (${ASSISTIDOS})`
btnAssistindo.textContent += ` (${ASSISTINDO})`
btnQuero.textContent += ` (${QUERO})`
rodape.textContent += ` · ${TOTAL} filmes cadastrados`


// funcoes auxiliares
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

function validarFilme(filme) {
    const erros = []
    if (!filme.titulo)
        erros.push("Título obrigatório")
    if (filme.ano < 1888 || filme.ano > 2030)
        erros.push("Ano inválido")
    return { valido: erros.length === 0, erros}
}

function criarCard(f) {

    const proximoId = (id) => {
        if (id == null) {
            return Math.max(...filmes.map(i => i.id)) + 1
        }
        return id
    }
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = proximoId(f.id);
    const titulo = document.createElement("h2")
    titulo.textContent = f.titulo;
    card.append(titulo)
    return card;
}

// renderizador dos cards na tela, cresce conforme o .json cresce
function renderizarCards(filmes) {

    const frag = document.createDocumentFragment();
    filmes.forEach((f) => {
        frag.appendChild(criarCard(f))
    });
    lista.replaceChildren(frag);
    // const cards = filmes.map((f) => `
    //    <article class="card" data-id="${f.id}" tabindex="0" role="button" aria-expanded="false">
    //       <!-- Conteúdo sempre visível -->
    //         <img src="${f.poster}" alt="Poster de ${f.titulo}" width="90">
    //         <h2>${f.titulo}</h2>
    //         <p>${f.ano} - ${f.genero}</p>
    //         <p class="nota">${estrelas(f.nota)}</p>
    //         <span class="badge" ${f.status}>${rotuloStatus(f.status)}</span>
    //         <div class="acoes">
    //             <button class="btn-editar">editar</button><button class="btn-remover">remover</button>
    //         </div>
    //     </article>
    //   `).join("");
    // lista.innerHTML = cards;

}

renderizarCards(filmes)

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



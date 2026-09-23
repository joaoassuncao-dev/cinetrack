import filmesInicias from './dados-exemplos.json' with { type: 'json'}

let filmes = [...filmesInicias]

// Declaração de botões do nav
const btnTodos = document.querySelector("nav button:nth-child(1)");
const btnAssistido = document.querySelector("nav button:nth-child(2)")
const btnAssistindo = document.querySelector("nav button:nth-child(3)")
const btnQuero= document.querySelector("nav button:nth-child(4)")

// Declaração do rodapé
const rodape = document.querySelector("footer small");
const lista = document.querySelector("#lista")

// Declaração de constantes
const TOTAL = filmes.length
const ASSISTIDOS = filmes.filter(f => f.status === "assistido").length
const ASSISTINDO = filmes.filter(f => f.status === "assistindo").length
const QUERO = filmes.filter(f => f.status === "quero").length

// Adiciona Label de número de filmes com cada status
btnTodos.textContent += ` (${TOTAL})`
btnAssistido.textContent += ` (${ASSISTIDOS})`
btnAssistindo.textContent += ` (${ASSISTINDO})`
btnQuero.textContent += ` (${QUERO})`
rodape.textContent += ` · ${TOTAL} filmes cadastrados`

// Declaracao de variaveis do modal (form-filme)
let editandoId = null
const modal = document.querySelector("#modal")
const form = document.querySelector("#form-filme")
const abrir = () => modal.hidden = false;
const fechar = () => modal.hidden = true;

const nav = document.querySelector("nav")

// Definicao de listeners 

// Listener para abrir modal
document.querySelector("header button")
    .addEventListener("click", () => {
        editandoId = null;
        form.reset();
        abrir();
});

// Listener para fechar modal com "ESC"
document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !modal.hidden) {
        fechar()
    }
});

// Listener para salvar dados no form, tanto criar quanto editar
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

    const proximoId = (lista) =>
         Math.max(...lista.map(i => i.id)) + 1

    if (editandoId !== null) {
        filmes = filmes.map((f) => 
            f.id == editandoId
                ? {...f, ...dados} : f
        )
    } else {
        filmes = [...filmes, {
            id: proximoId(filmes), ...dados
        }]
    }

    renderizarCards(filmes)
    
    fechar()
    form.reset()
})

// Listener para configurar a funcao do botao cancelar do form
document.querySelector(".btnCancelar")
    .addEventListener("click", () => {
        fechar()
});

// Listener para configurar a funcao de filtro dos botoes de status
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

// Listener para configurar o botao de remover dos cards  
lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover")
    if (!botao) return;
    if (!confirm("Remover este filme?")) return;
    const card = botao.closest(".card")
    const id = Number(card.dataset.id);
    filmes = filmes.filter((f) => f.id !== id)
    renderizarCards(filmes);
});

// Listener para configurar o botao de editar dos cards
lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-editar")
    if (!botao) return;
    const card = botao.closest(".card")
    editandoId = Number(card.dataset.id)
    const f = filmes.find(
        (x) => x.id === editandoId
    )

    form.elements.titulo.value = f.titulo
    form.elements.ano.value = f.ano
    form.elements.genero.value = f.genero
    form.elements.nota.value = f.nota
    form.elements.status.value = f.status
    abrir()
})

// funcoes auxiliares

// Funcao para adicionar o status corretamente nos cards
function rotuloStatus(status) {
    if(status === "assistido") {return "Assistido"};
    if(status === "assistindo") {return "Assistindo"};
    if(status === "quero") {return "Quero Assistir"}
    return status;
}

// Funcao para adicionar as estrelas corretamente nos cards
const estrelas = (nota) => {
    let resultaddo = '';
    for (let i=1; i <= 5; i++) {
        resultaddo += i <= nota ? '★' : '☆';
    }
    return resultaddo;
}

// Funcao para validar se o filme tem as informacoes certas
function validarFilme(filme) {
    const erros = []
    if (!filme.titulo)
        erros.push("Título obrigatório")
    if (filme.ano < 1888 || filme.ano > 2030)
        erros.push("Ano inválido")
    return { valido: erros.length === 0, erros}
}

// Funcao para criar cards dinamicamente, tanto da importacao do JSON quando do form
function criarCard(f) {
    
    const card = document.createElement("article");
    const titulo = document.createElement("h2")
    const poster = document.createElement("img")
    const ano = document.createElement("p")
    const nota = document.createElement("p")
    const badge = document.createElement("span")
    const acoes = document.createElement("div")
    const btnEditar = document.createElement("button")
    const btnRemover = document.createElement("button")
    
    card.className = "card";
    card.dataset.id = f.id;
    badge.className = "badge"
    acoes.className = "acoes";
    btnEditar.className = "btn-editar";
    btnRemover.className = "btn-remover"    
    
    titulo.textContent = f.titulo;
    if (!f.poster) {
        poster.src = `https://placehold.co/200x300?text=${f.titulo}`
        poster.alt = `Poster de ${f.titulo}`
    }
    else {
        poster.src = f.poster
        poster.alt = `Poster de ${f.titulo}`
    }
    ano.textContent = f.ano + " - " +  f.genero;
    nota.textContent = estrelas(f.nota)
    badge.textContent = rotuloStatus(f.status)
    if (f.status) {
        let s = f.status
        badge.setAttribute(s.split(" ")[0], "")
    }
    btnEditar.textContent = "editar"
    btnRemover.textContent = "remover"

    card.append(titulo)
    card.append(poster)
    card.append(ano) 
    card.append(nota)
    card.append(badge)
    acoes.append(btnEditar, btnRemover)
    card.append(acoes)

    return card;
}

// renderizador dos cards na tela, cresce conforme o .json cresce
function renderizarCards(filmes) {

    const frag = document.createDocumentFragment();
    filmes.forEach((f) => {
        frag.appendChild(criarCard(f))
    });
    lista.replaceChildren(frag);

}


// function expandCards(card) {
//     const expandido = card.classList.toggle('expandido');
//     card.setAttribute('aria-expanded', expandido);
// }

// lista.addEventListener('click', (event) => {
//     if (event.target.closest('button')) {
//         return;
//     }
    
//     const card = event.target.closest('.card')
//     if (card) {
//         expandCards(card)
//     }
    
// })

renderizarCards(filmes)


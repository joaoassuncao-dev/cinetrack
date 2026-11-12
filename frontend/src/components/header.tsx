import Titulo from "./titulo"

export default function Header() {

    return (
        <header className="header">
            <Titulo />
            <input type="text" aria-label="adicionar"placeholder="Buscar filme..."/>
            <button className="btnAdicionar" aria-label="Adicionar Filme">
                <span className="icone">+</span>
                <span className="texto">Adicionar</span>
            </button>
        </header>
    )

}
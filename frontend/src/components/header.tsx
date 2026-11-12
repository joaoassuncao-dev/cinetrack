import Titulo from "./titulo"

export default function Header({busca, aoBuscar}) {

    return (
        <header className="header">
            <Titulo />
            <input type="text" 
                aria-label="adicionar"
                placeholder="Buscar filme..."
                value={busca}
                    onChange={(e) => 
                        aoBuscar(e.target.value)
                    }/>
            <button className="btnAdicionar" aria-label="Adicionar Filme">
                <span className="icone">+</span>
                <span className="texto">Adicionar</span>
            </button>
        </header>
    )

}
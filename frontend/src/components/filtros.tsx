export default function Filtros() {

    return (
        <nav aria-label="Filtros de status">
            <button data-status="todos" className="ativo">Todos</button>
            <button data-status="assistido" >Assistido</button>
            <button data-status="assistindo" >Assistindo</button>
            <button data-status="quero" >Quero Assistir</button>
        </nav>
    )

}
export default function Card({ filme } : {filme:any}) {
    
    // Funcao para colocar a badge de maneira adequada
    function setBadge(status:string) {

        if(status === "assistido") {return "Assistido"};
        if(status === "assistindo") {return "Assistindo"};
        if(status === "quero") {return "Quero Assistir"};
        return status;

    }

    // Sub-componente de estrelas na nota;
    function NotaEstrela({nota} : {nota:number}) {

        const estrelas = [1, 2, 3, 4, 5]
            .filter((i) => nota >= i - 0.5)
            .map((i) => (
                <span key={i} className={`estrela ${nota >= i ? "cheia" : "meia"}`}>★</span>
            ))

        return <div className="nota-estrela">{estrelas}</div>
    }
    
    function BtnEditar() {
        return (
            <button className="btn-editar">editar</button>
        )
    }

    function BtnRemover() {
        return (
            <button className="btn-remover">remover</button>
        )
    }

    const status = filme.status?.split(" ")[0];

    return ( 
        <article className="card"> 
            <img src={filme.poster} alt="" />
            <h2>{filme.titulo}</h2>
            <p>{filme.ano} - {filme.genero}</p>
            <div className="nota-estrela">
                <NotaEstrela nota={filme.nota} />
            </div>
            <span className="badge" data-status={status}>{setBadge(filme.status)}</span>
            <div className="acoes">
                <BtnEditar />
                <BtnRemover />
            </div>
        </article>
    );

}

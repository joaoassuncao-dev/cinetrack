function setBadge(status:string) {

    if(status === "assistido") {return "Assistido"};
    if(status === "assistindo") {return "Assistindo"};
    if(status === "quero") {return "Quero Assistir"};
    return status;

}

function NotaEstrela({nota} : {nota:number}) {

    const estrelas = [1, 2, 3, 4, 5]
        .filter((i) => nota >= i - 0.5)
        .map((i) => (
            <span key={i} className={`estrela ${nota >= i ? "cheia" : "meia"}`}>★</span>
        ))

    return <div className="nota-estrela">{estrelas}</div>
} 

export default function Card({ filme } : {filme:any}) {

    return ( 
        <article className="card"> 
            <img src={filme.poster} alt="" />
            <h2>{filme.titulo}</h2>
            <p>{filme.ano} - {filme.genero}</p>
            <div className="nota-estrela">
            <NotaEstrela nota={filme.nota} />
            </div>
            <span className="badge">{setBadge(filme.status)}</span>
        </article>
    );

}

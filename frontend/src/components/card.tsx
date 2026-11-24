import { useState } from 'react'

// Sub-componente de estrelas na nota;
    function NotaEstrela({nota} : {nota:number}) {

        const estrelas = [1, 2, 3, 4, 5]
            .filter((i) => nota >= i - 0.5)
            .map((i) => (
                <span key={i} className={`estrela ${nota >= i ? "cheia" : "meia"}`}>★</span>
            ))

        return <div className="nota-estrela">{estrelas}</div>
    }

export default function Card({ filme, aoEditar, aoRemover }) {
    
    const [confirm, setConfirm] = useState(false);

    const handleConfirm = () => {
        aoRemover(filme.id);
        setConfirm(false);
    }

    // Funcao para colocar a badge de maneira adequada
    function setBadge(status:string) {

        if(status === "assistido") {return "Assistido"};
        if(status === "assistindo") {return "Assistindo"};
        if(status === "quero") {return "Quero Assistir"};
        return status;
    }

    
    
    function BtnEditar() {
        return (
            <button className="btn-editar" onClick={() => aoEditar(filme)}>
                editar
            </button>
        )
    }

    function BtnRemover() {
        return (
            <button className="btn-remover" onClick={() => setConfirm(true)}>
                remover
            </button>
        )
    }

    const status = filme.status?.split(" ")[0];

    return (
        <>
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
            {confirm && (
                    <div role="dialog" aria-modal="true" id="modal">
                        <div className="modal-confirm">
                            <p>Remover este filme?</p>
                            <div className="acoes">
                                <button onClick={() => setConfirm(false)}>Cancelar</button>
                                <button onClick={handleConfirm}>OK</button>
                            </div>
                        </div>
                    </div>
            )}
        </>
    );

}

import { useEffect, useState } from "react"

const VAZIO = {
    titulo: "",
    ano: "",
    genero: "",
    status: "quero",
    nota: 0,
}

export default function ModalFilme({ filme, aoSalvar, aoFechar}) {
     
    const [dados, setDados] = useState({
        ...VAZIO,
        ...filme,
    })

    const [hover, setHover] = useState(0);
    
    function atualizar(campo, valor) {
        setDados((anteriores) => ({
            ...anteriores,
            [campo]: valor,
        }))
    }

    function ContainerEstrela({ total = 5 }) {

        const calcularValor = (e, indice) => {
            const { left, width } = e.currentTarget.getBoundingClientRect();
            const naMetadeEsquerda = e.clientX - left < width / 2;
            return naMetadeEsquerda ? indice - 0.5 : indice;
        };

        const valorAtual = hover || dados.nota;   

        return (
                <div id="form-filme">
                    <div onMouseLeave={() => setHover(0)}>
                        {Array.from({ length: total }, (_, i) => {
                        const indice = i + 1;

                        let classe = "estrela";
                        if (valorAtual >= indice) classe += " cheia";
                        else if (valorAtual >= indice - 0.5) classe += " meia";

                        return (
                            <span
                                key={indice}
                                className={classe}
                                onMouseMove={(e) => setHover(calcularValor(e, indice))}
                                onClick={(e) => atualizar("nota", calcularValor(e, indice))}
                            >
                            ★
                            </span>
                        );
                        })}
                    </div>
                </div>
  );
    }

    function submeter(e) {

        e.preventDefault();
        aoSalvar({
            ...dados,
            ano: Number(dados.ano),
            nota: Number(dados.nota),
            status: (dados.status)
        })
    }

    function BtnSalvar() {

        return (
            <button type="submit" className="btnSalvar">Salvar</button>
        )
    }

    function BtnCancelar() {
        return (
            <button type="button" className="btnCancelar"
                onClick={aoFechar}>Cancelar</button>
        )
    }

    return (
        <div id="modal">
            <div className="modal-conteudo">
                <h2>Adicionar Filme</h2>
                <form id="form-filme" onSubmit={submeter}>
                    <label htmlFor="titulo">Título: </label>
                    <input 
                        type="text" 
                        name="titulo" 
                        id="titulo" 
                        value={dados.titulo} 
                        onChange={(e) => atualizar("titulo", e.target.value) }
                        required />
                    <label htmlFor="ano">Ano: </label>
                    <input 
                        type="number" 
                        name="ano" 
                        id="ano" 
                        value={dados.ano} 
                        onChange={(e) => atualizar("ano", e.target.value) }
                        required />
                    <label htmlFor="genero">Gênero: </label>
                    <input 
                        type="text" 
                        name="genero" 
                        id="genero" 
                        value={dados.genero} 
                        onChange={(e) => atualizar("genero", e.target.value) }
                        required />
                    <label>Nota: <strong id="valor-nota-texto">{dados.nota}</strong></label>
                    <ContainerEstrela />
                    <label htmlFor="status">Status: </label>
                    <select 
                        name="status" 
                        id="status" 
                        value={dados.status} 
                        onChange={(e) => atualizar("status", e.target.value) }
                        required
                        >
                        <option value={"assistido"}>Assistido</option>
                        <option value={"assistindo"}>Assistindo</option>
                        <option value={"quero"}>Quero Assistir</option>
                    </select>
                    <label htmlFor="comentario">Comentário: </label>
                    <textarea 
                        name="comentario" 
                        id="comentario" 
                        rows={5} cols={50}
                        value={dados.comentario} 
                        onChange={(e) => atualizar("comentario", e.target.value) }    
                        >
                    </textarea>
                    <div>
                        <BtnCancelar></BtnCancelar>
                        <BtnSalvar></BtnSalvar>
                    </div>
                </form>
            </div>
        </div>
    )

}
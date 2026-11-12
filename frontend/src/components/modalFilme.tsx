import { useState } from "react"

const VAZIO = {
    titulo: "",
    ano: "",
    genero: "",
    status: "quero",
    nota: 3,
}

export default function ModalFilme({ filme, aoSalvar, aoFechar}) {

    const [dados, setDados] = useState({
        ...VAZIO,
        ...filme,
    })

    function atualizar(campo, valor) {
        setDados((anteriores) => ({
            ...anteriores,
            [campo]: valor,
        }))
    }

    function submeter(e) {
        e.preventDefault();
        aoSalvar({
            ...dados,
            ano: Number(dados.ano),
            nota: Number(dados.nota)
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
                    <input type="text" name="titulo" id="titulo" required />
                    <label htmlFor="ano">Ano: </label>
                    <input type="number" name="ano" id="ano" required />
                    <label htmlFor="genero">Gênero: </label>
                    <input type="text" name="genero" id="genero" required />
                    <label>Nota: <strong id="valor-nota-texto">0</strong></label>
                    <div className="nota-estrela" id="container-nota">
                        <span className="estrela" data-valor="1">★</span>
                        <span className="estrela" data-valor="2">★</span>
                        <span className="estrela" data-valor="3">★</span>
                        <span className="estrela" data-valor="4">★</span>
                        <span className="estrela" data-valor="5">★</span>
                    </div>
                    <input type="hidden" id="nota" name="nota" value="0" required/>
                    <label htmlFor="status">Status: </label>
                    <select name="status" id="status" required>
                        <option>Assistido</option>
                        <option>Assistindo</option>
                        <option>Quero Assistir</option>
                    </select>
                    <label htmlFor="comentario">Comentário: </label>
                    <textarea name="comentario" id="comentario" rows={5} cols={50}></textarea>
                    <div>
                        <BtnCancelar></BtnCancelar>
                        <BtnSalvar></BtnSalvar>
                    </div>
                </form>
            </div>
        </div>
    )

}
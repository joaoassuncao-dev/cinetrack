import Card from "./card"

export default function ListaFilmes( { filmes } : {filmes : any}) {

    if (filmes.length === 0)  {
        return <p>Nenhum filme encontrado.</p>
    }

    return (
        <section id="lista">
            {filmes.map((f:any) => (
                <Card key={f.id} filme={f} />
            ))}
        </section>
    )
}
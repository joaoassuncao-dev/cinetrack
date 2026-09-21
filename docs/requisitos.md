# Cinetrack
- Cinetrack é um sistema web de catálogo de filmes, com cadastro, listagem, busca e filtros.

## Requisitos
- Cadastro com título, ano, gênero, pôster, status, nota e comentário
- Interface com busca por título, filtros de status, lista de filmes e formulário de cadastro.
- CRUD 

## Camadas
- Apresentação -> telas, cards, formulários e botões.
- Lógica de negócio -> validação, filtros e atualização da lista.
- Acesso a dados -> repositório dos filmes em memória ou JSON.
- **Parte 2** -> API expõe operações para listar, criar, editar e remover filmes.

### Operações da API
listar      -       get         -       /filmes
buscar      -       get         -       /filmes/:id
cadastrar   -       post        -       /filmes
editar      -       put         -       /filmes/:id
remover     -       delete      -       /filmes/:id

## Partes

Parte 1: FrontEnd
Parte 2: API e Banco de Dados (persistência)

## Stack Tecnológica
- Node JS
- React
- HTML
- CSS
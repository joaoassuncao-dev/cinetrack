import filmesIniciais from './dados-exemplos.json' with { type: 'json'}

export let filmesInicias = filmesIniciais;

export const gerarId = (filmesIniciais) =>
    Math.max(...filmesIniciais.map(i => i.id)) + 1
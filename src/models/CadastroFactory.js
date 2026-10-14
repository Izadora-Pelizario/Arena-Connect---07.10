const Modalidade = require('./Modalidade');
const { Atleta, Arbitro } = require('./Pessoa');
const Turma = require('./Turma');
const Equipe = require('./Equipe');
const Partida = require('./Partida');

// FACTORY: um único ponto de criação das entidades. Os setters das classes só
// imprimem "[ERRO]" e ignoram o valor inválido — a fábrica confere o resultado
// e LANÇA um erro, então quem pede a criação nunca recebe um objeto "pela metade".
class CadastroFactory {
    static criarTurma(id, nome) {
        const turma = new Turma(id, nome);
        if (!turma.nome) throw new Error('Nome de turma inválido.');
        return turma;
    }

    static criarAtleta(id, nome, idTurma) {
        const atleta = new Atleta(id, nome, idTurma);
        if (!atleta.nome) throw new Error('Nome de atleta inválido.');
        if (atleta.idTurma === undefined) throw new Error('Turma do atleta inválida.');
        return atleta;
    }
    static criarEquipe(id, idTurma, modalidade) {
        const equipe = new Equipe(id, idTurma, modalidade);
        if (equipe.idTurma === undefined) throw new Error('Turma da equipe inválida.');
        if (!equipe.modalidade) {
            throw new Error(`Modalidade inválida. Use uma de: ${Object.values(Modalidade).join(', ')}.`);
        }
        return equipe;
    }

    static criarArbitro(id, nome, numeroCredencial, anosExperiencia) {
        const arbitro = new Arbitro(id, nome, numeroCredencial, anosExperiencia);
        if (!arbitro.nome) throw new Error('Nome de árbitro inválido.');
        if (arbitro.numeroCredencial === undefined) throw new Error('Número de credencial inválido.');
        if (arbitro.anosExperiencia === undefined) throw new Error('Anos de experiência inválidos.');
        return arbitro;
    }

    static criarPartida(id, idEquipeA, idEquipeB, golsA, golsB, modalidade) {
        // 1. Se o primeiro parâmetro for um objeto (dados lidos do estado.json no carregarEstado)
        if (typeof id === 'object' && id !== null) {
            const dados = id;

            // Extrai os campos com fallback para o objeto placar ou propriedades diretas
            const idPartida = dados.id;
            const eqA = dados.idEquipeA;
            const eqB = dados.idEquipeB;
            const gA = dados.placar?.golsA ?? dados.golsA;
            const gB = dados.placar?.golsB ?? dados.golsB;
            const mod = dados.modalidade;

            // Validações seguras contra undefined e null
            if (gA === undefined || gA === null || isNaN(Number(gA))) {
                throw new Error('Gols da equipe A inválidos.');
            }
            if (gB === undefined || gB === null || isNaN(Number(gB))) {
                throw new Error('Gols da equipe B inválidos.');
            }

            return {
                id: Number(idPartida),
                idEquipeA: Number(eqA),
                idEquipeB: Number(eqB),
                golsA: Number(gA),
                golsB: Number(gB),
                placar: {
                    golsA: Number(gA),
                    golsB: Number(gB)
                },
                modalidade: mod
            };
        }

        // 2. Se os parâmetros forem passados individualmente (no fluxo normal do Controller/Sistema)
        if (golsA === undefined || golsA === null || isNaN(Number(golsA))) {
            throw new Error('Gols da equipe A inválidos.');
        }
        if (golsB === undefined || golsB === null || isNaN(Number(golsB))) {
            throw new Error('Gols da equipe B inválidos.');
        }

        return {
            id: Number(id),
            idEquipeA: Number(idEquipeA),
            idEquipeB: Number(idEquipeB),
            golsA: Number(golsA),
            golsB: Number(golsB),
            placar: {
                golsA: Number(golsA),
                golsB: Number(golsB)
            },
            modalidade: modalidade
        };
    }
}

module.exports = CadastroFactory;

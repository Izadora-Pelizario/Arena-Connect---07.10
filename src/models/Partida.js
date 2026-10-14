const Placar = require('./Placar');

class Partida {
    #id;
    #idEquipeA;
    #idEquipeB;
    #modalidade;
    #placar;
    constructor(id, idEquipeA, idEquipeB, modalidade, golsA, golsB) {
        
        console.log("TESTE 3")
        this.#id = id;
        this.idEquipeA = idEquipeA;
        this.idEquipeB = idEquipeB;
        this.modalidade = modalidade;
        this.#placar = new Placar(golsA, golsB); // COMPOSIÇÃO (NOVO!)
    }
    get id() { return this.#id; };
    get idEquipeA() { return this.#idEquipeA; };
    get idEquipeB() { return this.#idEquipeB; };
    get modalidade() { return this.#modalidade; };
    get placar() { return this.#placar; };

    set idEquipeA(valor) {
        if (!Number.isInteger(valor) || valor < 0) {
            console.log('[ERRO] Id da equipe inválido.');
            return;
        }
        this.#idEquipeA = valor;
    }
    set idEquipeB(valor) {
        if (!Number.isInteger(valor) || valor < 0) {
            console.log('[ERRO] Id da equipe inválido.');
            return;
        }
        this.#idEquipeB = valor;
    }
    set modalidade(valor) {
        if (!valor) {
            console.log('[ERRO] Modalidade inválida');
            return;
        }
        this.#modalidade = valor;
    }

    exibir(nomeEquipeA, nomeEquipeB) {
        console.log(`ID: ${this.id} | ${nomeEquipeA} ${this.placar.golsA} X ${this.placar.golsB} ${nomeEquipeB} | ${this.modalidade}`);
    }
}

module.exports = Partida;
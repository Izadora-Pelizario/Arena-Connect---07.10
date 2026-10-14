class Placar{
    #golsA;
    #golsB;
    constructor(golsA, golsB){
        this.golsA = golsA;
        this.golsB = golsB;
    }
    set golsA(valor){
        if(!Number.isInteger(valor) || valor < 0){
            console.log('[ERRO] Gols inválidos.');
            return;
        }
        this.#golsA = valor;
    }
    set golsB(valor){
        if(!Number.isInteger(valor) || valor < 0){
            console.log('[ERRO] Gols inválidos.');
            return;
        }
        this.#golsB = valor;
    }
    get golsA(){return this.#golsA;};
    get golsB(){return this.#golsB;};

    vencedor(){
        if(this.#golsA > this.#golsB) return 'A';
        if(this.#golsB > this.#golsA) return 'B';
        return 'EMPATE';
    }
}

module.exports = Placar;

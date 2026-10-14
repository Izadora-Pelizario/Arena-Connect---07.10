const ClassificacaoService = require('../models/ClassificacaoService');
const ClassificacaoView = require('../views/ClassificacaoView');

const ClassificacaoController = {
    exibirClassificacao(sistema) {
        const turmas = sistema.turmas || [];
        const equipes = sistema.equipes || [];
        const partidas = sistema.partidas || [];

        const modalidades = [...new Set(equipes.map(e => e.modalidade))];
        const tabelasPorModalidade = {};

        modalidades.forEach(modalidade => {
            // Passa 'turmas' como primeiro argumento
            tabelasPorModalidade[modalidade] = ClassificacaoService.calcularPorModalidade(turmas, equipes, partidas, modalidade);
        });

        ClassificacaoView.exibirTabelas(tabelasPorModalidade);
    }
};

module.exports = ClassificacaoController;
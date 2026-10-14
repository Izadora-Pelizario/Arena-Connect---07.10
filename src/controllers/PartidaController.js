const PartidaView = require("../views/PartidaView");

const PartidaController = {
    registrarPartida(sistema) {
        sistema.listarEquipes();
        try {
            const idEquipeA = PartidaView.perguntarIdEquipe("Digite ID equipe A: ");
            const idEquipeB = PartidaView.perguntarIdEquipe("Digite ID equipe B: ");

            const golsA = PartidaView.perguntarGols("Informe os gols da equipe A: ");
            const golsB = PartidaView.perguntarGols("Informe os gols da equipe B: ");

            // A função do sistema agora devolve o objeto com nomeEquipeA e nomeEquipeB definidos
            const partida = sistema.registrarPartida(idEquipeA, idEquipeB, golsA, golsB);

            PartidaView.mostrarRegistrada(partida.nomeEquipeA, partida.golsA, partida.golsB, partida.nomeEquipeB);
        } catch (erro) {
            PartidaView.mostrarErroCadastro(erro.message);
        }
    },

    listar(sistema) {
        PartidaView.listarPartidas(sistema.listarPartidas());
    }
};

module.exports = PartidaController;

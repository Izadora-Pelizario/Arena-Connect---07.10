const PartidaView = require("../views/PartidaView");

const PartidaController = {
    registrarPartida(sistema) {
        sistema.listarEquipes();
        try {
            const idEquipeA = PartidaView.perguntarIdEquipe("Digite ID equipe A: ");
            const idEquipeB = PartidaView.perguntarIdEquipe("Digite ID equipe B: ");
            
            const golsA = PartidaView.perguntarGols("Informe os gols da equipe A: ");
            const golsB = PartidaView.perguntarGols("Informe os gols da equipe B: ");
            
            const partidaRegistrada = sistema.registrarPartida(idEquipeA, idEquipeB, golsA, golsB);
            
            PartidaView.mostrarRegistrada(
                partidaRegistrada.nomeEquipeA, 
                golsA, 
                golsB, 
                partidaRegistrada.nomeEquipeB
            );
        } catch (erro) {
            PartidaView.mostrarErroCadastro(erro.message);
        }     
    },

    listar(sistema) {
        PartidaView.listarPartidas(sistema.listarPartidas());
    }
};

module.exports = PartidaController;

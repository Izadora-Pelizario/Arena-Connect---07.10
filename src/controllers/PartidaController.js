const PartidaView = require("../views/PartidaView");
const { listar } = require("./AtletaController");

const PartidaController = {
    registrarPartida(sistema){
        sistema.listarEquipes();
        try{
            const idEquipeA = PartidaView.perguntarIdEquipe("Digite ID equipe A: ");
            const idEquipeB = PartidaView.perguntarIdEquipe("Digite ID equipe B: ");
            const golsA = PartidaView.perguntarGols("Informe os gols da equipe: ");
            const golsB = PartidaView.perguntarGols("Informe os gols da equipe: ");
            const { nomeEquipeA, nomeEquipeB } = sistema.registrarPartida(idEquipeA, idEquipeB, golsA, golsB);
            PartidaView.mostrarRegistrada( nomeEquipeA, golsA, golsB, nomeEquipeB)
        } catch(erro){
            PartidaView.mostrarErroCadastro(erro.message);
        }      
    },
    listar(sistema){
        PartidaView.listarPartidas(sistema.listarPartidas());
    }
}

module.exports = PartidaController;

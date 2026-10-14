const { mostrarErroCadastro } = require('./AtletaView');

const prompt = require('prompt-sync')();

const PartidaView = {
    perguntarIdEquipe(mensagem){
        return parseInt(prompt(mensagem));
    },
    perguntarGols(mensagem){
        return parseInt(prompt(mensagem));
    },
    mostrarRegistrada(nomeA, golsA, golsB, nomeB){
        console.log(`✔ Partida registrada com sucesso! ${nomeA} ${golsA} X ${golsB} ${nomeB}`);
    },
    mostrarErroCadastro(mensagem){
        console.log(`✖ Não foi possível registrar a partida`);
    },
    listarPartidas(lista) {
        console.log("\n=== LISTA DE PARTIDAS ===");
        
        if (!lista || lista.length === 0) {
            console.log("Nenhuma partida registrada ainda.\n");
            return;
        }

        lista.forEach(item => {
            // Suporta tanto o formato envelopado { partida, nomeEquipeA, nomeEquipeB } 
            // quanto o objeto de partida direto
            const p = item.partida || item;
            const nomeA = item.nomeEquipeA || p.nomeEquipeA || `Equipe ${p.idEquipeA}`;
            const nomeB = item.nomeEquipeB || p.nomeEquipeB || `Equipe ${p.idEquipeB}`;
            
            const golsA = p.golsA ?? p.placar?.golsA ?? 0;
            const golsB = p.golsB ?? p.placar?.golsB ?? 0;

            console.log(`ID: ${p.id} | ${nomeA} ${golsA} X ${golsB} ${nomeB} | ${p.modalidade || 'Geral'}`);
        });
        
        console.log("");
    }
};
module.exports = PartidaView;
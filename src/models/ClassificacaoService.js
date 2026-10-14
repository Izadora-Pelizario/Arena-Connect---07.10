class ClassificacaoService {
    static ordenarClassificacao(tabela) {
        return tabela.sort((a, b) => {
            if (b.pontos !== a.pontos) return b.pontos - a.pontos;
            if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
            if (b.golsPro !== a.golsPro) return b.golsPro - a.golsPro;
            return a.nomeEquipe.localeCompare(b.nomeEquipe);
        });
    }

    // Recebe 'turmas', 'equipes', 'partidas' e 'modalidade'
    static calcularPorModalidade(turmas, equipes, partidas, modalidade) {
        const equipesDaModalidade = equipes.filter(e => e.modalidade === modalidade);

        const tabelaMap = {};
        equipesDaModalidade.forEach(equipe => {
            // Busca o nome da turma usando o array 'turmas' recebido
            const turma = (turmas || []).find(t => t.id === equipe.idTurma);
            const nomeTurma = turma ? turma.nome : `Turma ${equipe.idTurma}`;

            tabelaMap[equipe.id] = {
                nomeEquipe: `${nomeTurma} - ${equipe.modalidade}`,
                jogos: 0,
                vitorias: 0,
                empates: 0,
                derrotas: 0,
                golsPro: 0,
                golsContra: 0,
                saldoGols: 0,
                pontos: 0
            };
        });

        const partidasDaModalidade = partidas.filter(p => p.modalidade === modalidade);

        partidasDaModalidade.forEach(p => {
            // Tenta encontrar pelas chaves normais ou alternativas caso o objeto venha de uma classe Placar
            const idA = p.idEquipeA || p.idEquipe1;
            const idB = p.idEquipeB || p.idEquipe2;

            const timeA = tabelaMap[idA];
            const timeB = tabelaMap[idB];

            if (!timeA || !timeB) return;

            // Tenta obter os golos tratando valores indefinidos e convertendo explicitamente para Número
            const gA = Number(p.golsA ?? p.golsEquipeA ?? p.placar?.golsA ?? 0);
            const gB = Number(p.golsB ?? p.golsEquipeB ?? p.placar?.golsB ?? 0);

            // Se por algum motivo a conversão falhar, assume 0 para não quebrar com NaN
            const golsAValidos = isNaN(gA) ? 0 : gA;
            const golsBValidos = isNaN(gB) ? 0 : gB;

            // Incrementa estatísticas do Time A
            timeA.jogos++;
            timeA.golsPro += golsAValidos;
            timeA.golsContra += golsBValidos;
            timeA.saldoGols = timeA.golsPro - timeA.golsContra;

            // Incrementa estatísticas do Time B
            timeB.jogos++;
            timeB.golsPro += golsBValidos;
            timeB.golsContra += golsAValidos;
            timeB.saldoGols = timeB.golsPro - timeB.golsContra;

            // Atribui pontos
            if (golsAValidos > golsBValidos) {
                timeA.vitorias++;
                timeA.pontos += 3;
                timeB.derrotas++;
            } else if (golsBValidos > golsAValidos) {
                timeB.vitorias++;
                timeB.pontos += 3;
                timeA.derrotas++;
            } else {
                timeA.empates++;
                timeA.pontos += 1;
                timeB.empates++;
                timeB.pontos += 1;
            }
        });

        return this.ordenarClassificacao(Object.values(tabelaMap));
    }
}

module.exports = ClassificacaoService;
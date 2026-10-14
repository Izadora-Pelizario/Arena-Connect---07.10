const ClassificacaoView = {
    exibirTabelas(tabelasPorModalidade) {
        if (Object.keys(tabelasPorModalidade).length === 0) {
            console.log("\nNenhuma equipa ou modalidade registada ainda.\n");
            return;
        }

        for (const [modalidade, tabela] of Object.entries(tabelasPorModalidade)) {
            console.log(`\n=== TABELA DE CLASSIFICAÇÃO: ${modalidade.toUpperCase()} ===\n`);
            console.log("POSIÇÃO | EQUIPE                        | JOGOS  | VITÓRIAS  | EMPATES  | DERROTAS  | GOLS PRÓ | GOLS CONTRA | SALDO DE GOLS | PONTOS");
            console.log("--------------------------------------------------------------------------------------------------------------------------------------");

            if (tabela.length === 0) {
                console.log("Sem equipes registadas nesta modalidade.");
                continue;
            }

            tabela.forEach((linha, index) => {
                const pos = String(index + 1).padStart(2, ' ');
                const nome = linha.nomeEquipe.padEnd(18, ' ').substring(0, 18);
                const j = String(linha.jogos).padStart(2, ' ');
                const v = String(linha.vitorias).padStart(2, ' ');
                const e = String(linha.empates).padStart(2, ' ');
                const d = String(linha.derrotas).padStart(2, ' ');
                const gp = String(linha.golsPro).padStart(2, ' ');
                const gc = String(linha.golsContra).padStart(2, ' ');
                const sg = String(linha.saldoGols).padStart(2, ' ');
                const pts = String(linha.pontos).padStart(3, ' ');

                console.log(` ${pos}     | ${nome}            |${j}      | ${v}        |${e}        |${d}         |${gp}        |${gc}           |${sg}             |${pts}       `);
            });
        }
        console.log("");
    }
};

module.exports = ClassificacaoView;
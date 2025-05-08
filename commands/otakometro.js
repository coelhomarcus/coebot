const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('otakometro')
        .setDescription('📊 Mede o nível de otaku de um usuário com descrições hilárias')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário para analisar o nível de otaku')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const targetUser = interaction.options.getUser('usuario');

            // Lista de níveis de otaku com descrições bizarras e engraçadas
            const niveisOtaku = [
                {
                    titulo: "Otaku Iniciante (Nível 1)",
                    descricao: "Conhece Dragon Ball, Naruto e acha que isso é ser otaku. Já tentou fazer um Kamehameha no chuveiro, mas ninguém pode provar.",
                    caracteristicas: [
                        "Só assistiu animes populares que passaram na TV",
                        "Acha que Boku no Hero é uma obra prima revolucionária",
                        "Não sabe pronunciar 'Evangelion' corretamente",
                        "Tem uma camiseta de anime que usa escondido"
                    ]
                },
                {
                    titulo: "Otaku Casual (Nível 2)",
                    descricao: "Já maratonou alguns animes no fim de semana e sabe o que é 'waifu'. Tem um poster escondido atrás da porta.",
                    caracteristicas: [
                        "Usa 'kawaii' em conversas normais e depois pede desculpas",
                        "Já considerou comprar um dakimakura, mas tem vergonha",
                        "Seu histórico do navegador tem mais anime que sites normais",
                        "Tenta convencer os amigos que anime não é só 'desenho japonês'"
                    ]
                },
                {
                    titulo: "Otaku Intermediário (Nível 3)",
                    descricao: "Já sabe a diferença entre mangá e manhwa. Tem uma pequena coleção escondida e sabe todos os openings de seus animes favoritos.",
                    caracteristicas: [
                        "Já tentou cozinhar comida japonesa seguindo tutoriais de anime",
                        "Tem uma playlist secreta só com openings e endings",
                        "Fala 'yamete kudasai' aleatoriamente e ri sozinho",
                        "Pausa animes nos melhores frames para usar como wallpaper"
                    ]
                },
                {
                    titulo: "Otaku Avançado (Nível 4)",
                    descricao: "O quarto parece uma loja de anime, e já foi em pelo menos um evento de anime vestido como personagem. Sua família está preocupada.",
                    caracteristicas: [
                        "Tem mais posters que parede disponível",
                        "Já gastou um salário inteiro em figures de PVC",
                        "Tem mais waifus que amigos na vida real",
                        "Já tentou aprender japonês só para assistir sem legendas"
                    ]
                },
                {
                    titulo: "Otaku Extremo (Nível 5)",
                    descricao: "Comunica-se primariamente através de referências a anime. Já considerou cirurgia plástica para parecer mais com personagens 2D.",
                    caracteristicas: [
                        "Relacionamentos românticos só com pessoas que passarem no teste de conhecimento otaku",
                        "Coleciona body pillows de todos os seus personagens favoritos",
                        "Já tentou fazer o cabelo em estilo anime... várias vezes",
                        "Tem um altar dedicado à sua waifu principal"
                    ]
                },
                {
                    titulo: "Otaku Lendário (Nível 6)",
                    descricao: "O lendário ser que transcendeu a necessidade de interação social. Provavelmente mora em um quarto repleto de mercadorias de anime e só sai para eventos.",
                    caracteristicas: [
                        "Tem uma coleção completa de mangás raros que ninguém conhece",
                        "Consegue identificar qualquer anime com apenas 0.5 segundos de cena",
                        "Já considerou se mudar para o Japão só para estar mais perto da 'cultura'",
                        "O histórico de navegação é uma preocupação de segurança nacional"
                    ]
                },
                {
                    titulo: "Otaku Mitológico (Nível 7)",
                    descricao: "Diz-se que este nível de otaku é apenas um mito. Uma presença sentida apenas nos confins mais profundos da internet e convenções de anime.",
                    caracteristicas: [
                        "Possui conhecimento enciclopédico de mais de 10.000 animes",
                        "Já gastou a entrada de um apartamento em mercadorias de anime",
                        "Fala japonês fluentemente apenas por assistir anime (sem legenda)",
                        "É dono de uma dakimakura para cada dia da semana... de cada mês"
                    ]
                },
                {
                    titulo: "Otaku Transcendental (Nível 8)",
                    descricao: "Transcendeu a existência humana e agora existe parcialmente no mundo 2D. Os governos monitoram seus movimentos.",
                    caracteristicas: [
                        "Consegue prever plots de animes antes mesmo dos criadores pensarem neles",
                        "Tem uma coleção tão grande que precisa de um sistema de catalogação digital",
                        "Já foi confundido com um personagem de anime na rua... várias vezes",
                        "Seu quarto é considerado santuário otaku por peregrinos do mundo todo"
                    ]
                },
                {
                    titulo: "Além do Otaku (Nível 9)",
                    descricao: "Não é mais classificado como otaku, mas como uma nova espécie. Cientistas estudam seu comportamento e hábitos de consumo.",
                    caracteristicas: [
                        "Consegue se comunicar telepaticamente com outros otakus de alto nível",
                        "Já foi banido de eventos de anime por 'conhecimento excessivamente perturbador'",
                        "Sua coleção é avaliada como patrimônio cultural em vários países",
                        "Tem um contrato de casamento com sua waifu reconhecido em alguma prefeitura japonesa"
                    ]
                },
                {
                    titulo: "Divindade Otaku (Nível MAX)",
                    descricao: "O ser supremo. A existência final. Literalmente não é mais humano, mas um conceito que transcende a realidade. Os animes são feitos na esperança de receber sua bênção.",
                    caracteristicas: [
                        "É rumoreado que Hayao Miyazaki liga para pedir conselhos",
                        "Quando assiste um anime ruim, o estúdio fecha no dia seguinte",
                        "Existe simultaneamente em nosso mundo e no universo de todos os animes",
                        "Seu poder de compra sustenta 17% da economia japonesa"
                    ]
                }
            ];

            // Frases adicionais aleatórias
            const frasesAdicionais = [
                "Sua pasta 'Homework' tem 500GB e nenhum arquivo de tarefa real.",
                "Já tentou invocar um Persona em situações de perigo.",
                "Quando o médico pergunta sobre atividade física, conta o tempo assistindo torneios de artes marciais em anime.",
                "Já chamou o chefe de 'senpai' sem querer.",
                "Tenta esconder suas compras de anime dos entregadores, que já sabem seu nome.",
                "Já tentou fazer jutsu de clones das sombras para entregar trabalhos em dias diferentes.",
                "Chora mais com finais de anime do que com problemas da vida real.",
                "Comprou palitinhos e agora come até miojo com eles.",
                "Quando perguntam onde aprendeu japonês, responde 'Duolingo' mas na verdade foi com anime.",
                "Já tentou entrar em uma academia para aprender a lutar como em Dragon Ball.",
                "Começa discussões sobre qual é o melhor anime em grupos que não são de anime.",
                "Já tentou encontrar as esferas do dragão no Google Maps.",
                "Usa o termo 'plot armor' para explicar por que não foi demitido ainda.",
                "Fala 'está mais para um 7/10' sobre qualquer coisa na vida real.",
                "Já cosplayou de personagem que ninguém reconheceu e ficou ofendido.",
                "Chama qualquer pessoa de 'tsundere' quando ela está irritada.",
                "Acredita secretamente que tem um Stand, só não descobriu qual ainda.",
                "Já tentou fazer aquela corrida de braços para trás do Naruto no parque.",
                "Quando fica nervoso, imagina a música tema de batalha tocando ao fundo.",
                "Tem mais conhecimento sobre mitologia japonesa do que sobre o próprio país."
            ];

            // Escolhe um nível aleatório
            const nivelAleatorio = niveisOtaku[Math.floor(Math.random() * niveisOtaku.length)];

            // Pega 2 frases aleatórias adicionais
            const frasesAleatoriasEscolhidas = [];
            while (frasesAleatoriasEscolhidas.length < 2) {
                const fraseAleatoria = frasesAdicionais[Math.floor(Math.random() * frasesAdicionais.length)];
                if (!frasesAleatoriasEscolhidas.includes(fraseAleatoria)) {
                    frasesAleatoriasEscolhidas.push(fraseAleatoria);
                }
            }

            // Gera uma porcentagem aleatória de otakunice (1-100)
            const porcentagemOtaku = Math.floor(Math.random() * 100) + 1;

            // Define cores baseadas no nível (do verde ao vermelho escuro conforme aumenta)
            const coresNiveis = [
                0x4CBB17, // Verde
                0x98FB98, // Verde claro
                0xFFFF00, // Amarelo
                0xFFA500, // Laranja
                0xFF4500, // Laranja avermelhado
                0xFF0000, // Vermelho
                0xDC143C, // Vermelho intenso
                0x8B0000, // Vermelho escuro
                0x4B0082, // Índigo
                0x800080  // Roxo
            ];

            // Índice baseado na porcentagem (para escolher a cor)
            const indiceNivel = Math.floor(porcentagemOtaku / 10);
            const cor = coresNiveis[Math.min(indiceNivel, coresNiveis.length - 1)];

            // Cria o embed
            const embed = new EmbedBuilder()
                .setColor(cor)
                .setTitle(`🔍 OTAKÔMETRO: Análise de ${targetUser.username}`)
                .setDescription(`O otakômetro detectou **${porcentagemOtaku}%** de poder otaku!`)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '📊 CLASSIFICAÇÃO', value: `**${nivelAleatorio.titulo}**\n*${nivelAleatorio.descricao}*`, inline: false },
                    { name: '🔍 CARACTERÍSTICAS DETECTADAS', value: nivelAleatorio.caracteristicas.map(c => `• ${c}`).join('\n'), inline: false },
                    { name: '✨ OBSERVAÇÕES ADICIONAIS', value: frasesAleatoriasEscolhidas.map(f => `• ${f}`).join('\n'), inline: false }
                )
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando otakometro:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao medir seu nível de otaku. Provavelmente o otakômetro explodiu de tanta otakunice!',
                ephemeral: true
            });
        }
    },
};
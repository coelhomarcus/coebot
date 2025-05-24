const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamometro')
        .setDescription('🎮 Mede o nível de gamer de um usuário (com muito sarcasmo)')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário para analisar o nível de gamer')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const targetUser = interaction.options.getUser('usuario');

            const niveisGamer = [
                {
                    titulo: "Gamer Fantasma (Nível 1)",
                    descricao: "Diz que joga, mas só tem Among Us no celular.",
                    caracteristica: "Chama qualquer jogo de 'joguinho' e acha que conhece tudo."
                },
                {
                    titulo: "Gamer de Domingo (Nível 2)",
                    descricao: "Joga Free Fire e se considera pro player.",
                    caracteristica: "Fala que vai virar streamer famoso jogando no celular da mãe."
                },
                {
                    titulo: "Gamer Teórico (Nível 3)",
                    descricao: "Assiste mais gameplay no YouTube do que joga.",
                    caracteristica: "Sabe tudo sobre o jogo mas nunca passou da primeira fase."
                },
                {
                    titulo: "Gamer de Fim de Semana (Nível 4)",
                    descricao: "Tem Steam com 200 jogos, jogou 3.",
                    caracteristica: "Compra jogo em promoção e nunca instala."
                },
                {
                    titulo: "Gamer Médio (Nível 5)",
                    descricao: "Joga só jogos populares e reclama que eram melhores antes.",
                    caracteristica: "Diz que Dark Souls é fácil mas nunca passou do tutorial."
                },
                {
                    titulo: "Gamer Experiente (Nível 6)",
                    descricao: "Tem setup gamer mas joga no mínimo porque 'FPS não importa'.",
                    caracteristica: "Gasta mais tempo configurando mods do que jogando."
                },
                {
                    titulo: "Gamer Hardcore (Nível 7)",
                    descricao: "Vive reclamando de tudo e nostálgico dos anos 90.",
                    caracteristica: "Xinga todo mundo de noob mas rage quit no primeiro death."
                },
                {
                    titulo: "Gamer Profissional (Nível 8)",
                    descricao: "Leva jogos muito a sério, esquece que é diversão.",
                    caracteristica: "Tem mais raiva dos teammates do que dos inimigos."
                },
                {
                    titulo: "Gamer Ascendido (Nível 9)",
                    descricao: "Transcendeu a necessidade de ter vida social.",
                    caracteristica: "Conhece mais NPCs que pessoas reais."
                },
                {
                    titulo: "Gamer Divino (Nível 10)",
                    descricao: "Existe apenas no plano digital, comunicando-se por emotes.",
                    caracteristica: "Seu sangue é Red Bull e sua alma é feita de códigos de trapaça."
                }
            ];

            const frasesZueiras = [
                "Diz que já zerou todos os jogos mas não tem nem 10 minutos de gameplay.",
                "Culpa o lag quando perde, mas quando ganha é 'pura skill'.",
                "Tem RGB em tudo, inclusive na escova de dente, mas joga no notebook da escola.",
                "Fala que vai comprar um PC gamer há 5 anos com o mesmo orçamento de R$ 500.",
                "Diz que é pro player mas não sabe nem mudar as configurações de vídeo.",
                "Tem 500 skins no CS:GO mas não sabe fazer spray control.",
                "Reclama que o jogo é pay-to-win mas nunca gastou nem R$ 5.",
                "Diz que mobile não é gaming de verdade mas só joga Candy Crush.",
                "Tem mais tempo assistindo speedrun do que jogando qualquer coisa.",
                "Fala que gráfico não importa mas só baixa jogo se tiver 4K no título.",
                "Diz que jogo indie é superior mas só joga FIFA e COD.",
                "Tem conta em todas as plataformas mas só usa o navegador para jogar.",
                "Reclama de microtransação mas comprou todos os DLCs do The Sims.",
                "Diz que é old school gamer mas descobriu Mario semana passada.",
                "Tem setup de streamer mas nunca fez uma live na vida.",
                "Fala que console é inferior mas joga no PlayStation do primo.",
                "Diz que conhece todos os Easter eggs mas precisa do Google para tudo.",
                "Tem mais medo de perder save do que de fantasma em jogo de terror.",
                "Fala que vai fazer speedrun mas demora 3 horas para sair da cidade inicial.",
                "Diz que multiplayer é tóxico mas é o primeiro a xingar no chat."
            ];

            // Obter nível e frase aleatórios
            const nivelAleatorio = niveisGamer[Math.floor(Math.random() * niveisGamer.length)];
            const fraseAleatoria = frasesZueiras[Math.floor(Math.random() * frasesZueiras.length)];
            const porcentagemGamer = Math.floor(Math.random() * 100) + 1;

            // Cores baseadas na porcentagem (do verde ao vermelho)
            const coresNiveis = [
                0x00FF00, // Verde - Nível baixo
                0x32CD32, // Verde lima
                0x90EE90, // Verde claro
                0xFFFF00, // Amarelo
                0xFFA500, // Laranja
                0xFF4500, // Laranja avermelhado
                0xFF0000, // Vermelho - Nível alto
                0x8B0000, // Vermelho escuro
                0x4B0082, // Índigo
                0x800080  // Roxo - Nível máximo
            ];

            const indiceNivel = Math.floor(porcentagemGamer / 10);
            const cor = coresNiveis[Math.min(indiceNivel, coresNiveis.length - 1)];

            const embed = new EmbedBuilder()
                .setColor(cor)
                .setTitle('🎮 Gamômetro')
                .setDescription(`<@${targetUser.id}> tem **${porcentagemGamer}%** de poder gamer! 🎯`)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                .addFields(
                    {
                        name: '\u200B',
                        value: ''
                    },
                    { 
                        name: '🎮 CLASSIFICAÇÃO', 
                        value: `**${nivelAleatorio.titulo}**\n*${nivelAleatorio.descricao}*`, 
                        inline: false 
                    },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    { 
                        name: '🔍 CARACTERÍSTICA DETECTADA', 
                        value: `• ${nivelAleatorio.caracteristica}`, 
                        inline: false 
                    },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    { 
                        name: '😏 OBSERVAÇÃO', 
                        value: `• ${fraseAleatoria}`, 
                        inline: false 
                    }
                )

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando gamemometro:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao medir seu nível de gamer!'
            });
        }
    },
};
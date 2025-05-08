const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('otakometro')
        .setDescription('📊 Mede o nível de otaku de um usuário')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário para analisar o nível de otaku')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const targetUser = interaction.options.getUser('usuario');

            const niveisOtaku = [
                {
                    titulo: "Otaku Iniciante (Nível 1)",
                    descricao: "Conhece Dragon Ball, Naruto e acha que isso é ser otaku.",
                    caracteristica: "Só assistiu animes populares que passaram na TV."
                },
                {
                    titulo: "Otaku Casual (Nível 2)",
                    descricao: "Já maratonou alguns animes no fim de semana e sabe o que é 'waifu'.",
                    caracteristica: "Usa 'kawaii' em conversas normais e depois pede desculpas."
                },
                {
                    titulo: "Otaku Intermediário (Nível 3)",
                    descricao: "Tem uma coleção escondida e sabe todos os openings de cor.",
                    caracteristica: "Já tentou cozinhar ramen igual ao Naruto."
                },
                {
                    titulo: "Otaku Avançado (Nível 4)",
                    descricao: "O quarto parece uma loja de anime. Sua família está preocupada.",
                    caracteristica: "Tem mais posters que parede disponível."
                },
                {
                    titulo: "Otaku Extremo (Nível 5)",
                    descricao: "Comunica-se através de referências a anime.",
                    caracteristica: "Já tentou fazer o cabelo em estilo anime... várias vezes."
                },
                {
                    titulo: "Otaku Lendário (Nível 6)",
                    descricao: "O ser que transcendeu a necessidade de interação social.",
                    caracteristica: "Consegue identificar qualquer anime com apenas 0.5 segundos de cena."
                },
                {
                    titulo: "Otaku Transcendental (Nível 7)",
                    descricao: "Existe parcialmente no mundo 2D. Os governos monitoram seus movimentos.",
                    caracteristica: "Seu quarto é considerado santuário otaku por peregrinos do mundo todo."
                },
                {
                    titulo: "Otaku Dimensional (Nível 8)",
                    descricao: "Vive entre as dimensões, respondendo apenas a referências de anime.",
                    caracteristica: "Tem um altar dedicado a seu waifu com oferendas diárias."
                },
                {
                    titulo: "Otaku Divino (Nível 9)",
                    descricao: "Alcançou a iluminação otaku. Pode sentir quando um novo episódio é lançado.",
                    caracteristica: "Já sonhou em japonês com legendas em português."
                },
                {
                    titulo: "Otaku Primordial (Nível 10)",
                    descricao: "Existia antes do termo 'otaku' ser inventado. É uma entidade cósmica.",
                    caracteristica: "Os criadores de anime o consultam para novas ideias."
                }
            ];
            const frasesAdicionais = [
                "Sua pasta 'Homework' tem 500GB e nenhum arquivo de tarefa real.",
                "Já chamou o chefe de 'senpai' sem querer.",
                "Tenta esconder suas compras de anime dos entregadores, que já sabem seu nome.",
                "Chora mais com finais de anime do que com problemas da vida real.",
                "Já tentou fazer jutsu de clones das sombras para entregar trabalhos em dias diferentes.",
                "Já tentou encontrar as esferas do dragão no Google Maps.",
                "Quando fica nervoso, imagina a música tema de batalha tocando ao fundo.",
                "Já tentou fazer aquela corrida de braços para trás do Naruto no parque.",
                "Tem mais waifus que amigos na vida real.",
                "Fala 'itadakimasu' antes de comer miojo no almoço.",
                "Seu celular tem mais apps de anime que de redes sociais.",
                "Já gastou um salário inteiro em figures de anime.",
                "Possui mais de cinco dakimakuras escondidas embaixo da cama.",
                "Consegue ler mangá de trás para frente mais rápido que um livro normal.",
                "Já tentou invocar um Persona em uma situação difícil.",
                "Tem um plano de fuga detalhado caso seja transportado para um isekai.",
                "Sabe mais palavras em japonês que em inglês, mas não fala nenhum dos dois.",
                "Já tentou cozinhar usando receitas de Food Wars.",
                "Conhece os aniversários de todos os personagens favoritos, mas esquece o da própria mãe.",
                "Já fez cosplay para ir ao mercado 'só porque sim'."
            ];

            const nivelAleatorio = niveisOtaku[Math.floor(Math.random() * niveisOtaku.length)];

            const fraseAleatoria = frasesAdicionais[Math.floor(Math.random() * frasesAdicionais.length)];

            const porcentagemOtaku = Math.floor(Math.random() * 100) + 1;

            // Define cores baseadas no nível (do verde ao vermelho escuro conforme aumenta)
            const coresNiveis = [
                0x4CBB17, // Verde
                0x98FB98, // Verde claro
                0xFFFF00, // Amarelo
                0xFFA500, // Laranja
                0xFF4500, // Laranja avermelhado
                0xFF0000, // Vermelho
                0x800080  // Roxo
            ];

            const indiceNivel = Math.floor(porcentagemOtaku / 15);
            const cor = coresNiveis[Math.min(indiceNivel, coresNiveis.length - 1)];

            const embed = new EmbedBuilder()
                .setColor(cor)
                .setTitle(`🔍 OTAKÔMETRO: ${targetUser.username}`)
                .setDescription(`O otakômetro detectou **${porcentagemOtaku}%** de poder otaku!`)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '📊 CLASSIFICAÇÃO', value: `**${nivelAleatorio.titulo}**\n*${nivelAleatorio.descricao}*`, inline: false },
                    { name: '🔍 CARACTERÍSTICA DETECTADA', value: `• ${nivelAleatorio.caracteristica}`, inline: false },
                    { name: '✨ OBSERVAÇÃO ADICIONAL', value: `• ${fraseAleatoria}`, inline: false }
                )
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando otakometro:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao medir seu nível de otaku!',
                ephemeral: true
            });
        }
    },
};
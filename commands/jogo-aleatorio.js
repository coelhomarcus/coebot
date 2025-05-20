const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { rawgKey } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jogo-aleatorio')
        .setDescription('🎮 Recebe uma recomendação de jogo aleatório'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const apiKey = rawgKey;

            const randomPage = Math.floor(Math.random() * 500) + 1;

            const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${randomPage}&page_size=20&platforms=4&ordering=-rating`);
            const data = await response.json();

            const jogos = data.results;
            const jogoAleatorio = jogos[Math.floor(Math.random() * jogos.length)];

            const coresJogos = [
                0x3498DB,
                0x2ECC71,
                0x9B59B6,
                0xF1C40F,
                0xE74C3C,
                0x1ABC9C,
                0xD35400,
                0x34495E
            ];

            const corAleatoria = coresJogos[Math.floor(Math.random() * coresJogos.length)];

            const nome = jogoAleatorio.name;
            const lancamento = jogoAleatorio.released || 'Data desconhecida';
            const rating = jogoAleatorio.rating ? `${jogoAleatorio.rating}/5` : 'Sem avaliação';
            const plataformas = jogoAleatorio.platforms ? jogoAleatorio.platforms.map(p => p.platform.name).join(', ') : 'Plataformas desconhecidas';
            const generos = jogoAleatorio.genres ? jogoAleatorio.genres.map(g => g.name).join(', ') : 'Gêneros desconhecidos';
            const imagem = jogoAleatorio.background_image || null;

            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setTitle(`🎮 ${nome}`)
                .addFields(
                    { name: '📅 Lançamento', value: lancamento, inline: true },
                    { name: '⭐ Avaliação', value: rating, inline: true },
                    { name: '🎯 Gêneros', value: generos, inline: false },
                    { name: '💻 Plataformas', value: plataformas, inline: false }
                )
                .setFooter({ text: 'Dados fornecidos por RAWG API' });

            if (imagem) {
                embed.setImage(imagem);
            }

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando jogo-aleatorio:', error);
            await interaction.editReply({
                content: '❌ Não foi possível encontrar um jogo aleatório. Tente novamente mais tarde!',
                ephemeral: true
            });
        }
    },
};

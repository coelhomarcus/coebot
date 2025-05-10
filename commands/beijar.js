const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beijar')
        .setDescription('💞 Beije alguém do servidor')
        .addUserOption(option =>
            option.setName('alvo')
                .setDescription('Quem você quer beijar')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const alvo = interaction.options.getUser('alvo');
            const autor = interaction.user;

            if (alvo.id === autor.id) {
                return await interaction.editReply('❌ Você não pode beijar a si mesmo! Isso seria estranho...');
            }

            const frases = [
                `${autor} deu um beijinho em ${alvo}! Que fofo! 💕`,
                `${autor} não resistiu e beijou ${alvo}! 💋`,
                `Um beijo inesperado de ${autor} para ${alvo}! 😘`,
                `${autor} roubou um beijo de ${alvo}! Que ousadia! 💓`,
                `${alvo} recebeu um beijo apaixonado de ${autor}! 💖`,
                `${autor} se aproximou lentamente e beijou ${alvo} 💝`,
                `O amor está no ar! ${autor} deu um beijo em ${alvo}! 💘`,
                `${alvo} foi surpreendido(a) com um beijo de ${autor}! 💞`,
                `Um beijo suave de ${autor} para ${alvo} 💗`
            ];

            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

            const response = await fetch(`https://nekos.life/api/v2/img/kiss`);
            const data = await response.json();
            const imageUrl = data.url;

            const coresRomanticas = [
                0xFF69B4,
                0xFF1493,
                0xDB7093,
                0xE91E63,
                0xF06292,
                0xFF0000,
                0xE53935,
                0xFF5252
            ];
            const corAleatoria = coresRomanticas[Math.floor(Math.random() * coresRomanticas.length)];

            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setDescription(`**${fraseAleatoria}**`)
                .setImage(imageUrl)

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando beijar:', error);
            await interaction.editReply({
                content: '❌ Algo deu errado ao tentar enviar o beijo. Tente novamente mais tarde!',
                ephemeral: true
            });
        }
    },
};
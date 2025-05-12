const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('atacar')
        .setDescription('🤺 Ataque alguém do servidor')
        .addUserOption(option =>
            option.setName('alvo')
                .setDescription('O usuário que você quer atacar')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const alvo = interaction.options.getUser('alvo');
            const autor = interaction.user;

            if (alvo.id === autor.id) {
                return await interaction.editReply('❌ Você não pode atacar a si mesmo! Isso seria estranho...');
            }

            const frases = [
                `${autor} atacou ${alvo} 💥`,
                `${autor} atacou ${alvo}! 💢`,
                `${alvo} foi atacado por ${autor}! 💫`,
                `A batalha começou! ${autor} atacou ${alvo}! ⚡`,
            ];

            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

            const response = await fetch(`https://api.waifu.pics/sfw/slap`);
            const data = await response.json();
            const imageUrl = data.url;

            const coresAtaque = [
                0xFF0000,
                0xE53935,
                0xFF5252,
                0xFFA500,
                0xFD8C04,
                0x8B0000,
                0x800000,
                0x9C27B0
            ];
            const corAleatoria = coresAtaque[Math.floor(Math.random() * coresAtaque.length)];

            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setDescription(`**${fraseAleatoria}**`)
                .setImage(imageUrl)

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando atacar:', error);
            await interaction.editReply({
                content: '❌ Algo deu errado ao tentar o ataque. Tente novamente mais tarde!',
                ephemeral: true
            });
        }
    },
};
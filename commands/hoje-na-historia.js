const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hoje-na-historia')
        .setDescription('📆 Mostra um fato histórico que aconteceu nesse dia'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const hoje = new Date();
            const dia = hoje.getDate();
            const mes = hoje.getMonth() + 1;

            const response = await fetch(`https://history.muffinlabs.com/date/${mes}/${dia}`);

            if (!response.ok) {
                return interaction.editReply({
                    content: '❌ Não foi possível obter os fatos históricos. Por favor, tente novamente mais tarde.',
                    ephemeral: true
                });
            }

            const data = await response.json();

            const eventos = data.data.Events;
            const eventoAleatorio = eventos[Math.floor(Math.random() * eventos.length)];

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`📜 Hoje na História: ${data.date}`)
                .setDescription(`**${eventoAleatorio.year}**: ${eventoAleatorio.text}`)
                .setFooter({
                    text: `Fonte: history.muffinlabs.com • ${dia}/${mes}`
                })
                .setTimestamp();

            await interaction.editReply({
                embeds: [embed]
            });

        } catch (error) {
            console.error('Erro ao buscar fatos históricos:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar fatos históricos. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
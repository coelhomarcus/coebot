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

            // Impedir que o usuário ataque a si mesmo
            if (alvo.id === autor.id) {
                return await interaction.editReply('❌ Você não pode atacar a si mesmo! Isso seria estranho...');
            }

            // Lista de frases para quando alguém ataca outra pessoa
            const frases = [
                `${autor} atacou ${alvo} com toda força! 💥`,
                `${autor} não teve piedade ao atacar ${alvo}! ⚔️`,
                `Um ataque surpresa de ${autor} contra ${alvo}! 🔥`,
                `${autor} desferiu um golpe poderoso em ${alvo}! 💢`,
                `${alvo} foi atingido por um ataque de ${autor}! 💫`,
                `${autor} avançou rapidamente e atacou ${alvo} 🗡️`,
                `A batalha começou! ${autor} atacou ${alvo}! ⚡`,
                `${alvo} foi surpreendido(a) com um ataque de ${autor}! 💪`,
                `Um ataque devastador de ${autor} contra ${alvo} 🥊`
            ];

            // Pega uma frase aleatória
            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

            // Busca uma imagem de ataque da API
            const response = await fetch(`https://api.waifu.pics/sfw/slap`);
            const data = await response.json();
            const imageUrl = data.url;

            // Define uma cor para o embed
            const coresAtaque = [
                0xFF0000, // vermelho
                0xE53935, // vermelho material
                0xFF5252, // vermelho claro
                0xFFA500, // laranja
                0xFD8C04, // laranja escuro
                0x8B0000, // vermelho escuro
                0x800000, // marrom avermelhado
                0x9C27B0  // roxo
            ];
            const corAleatoria = coresAtaque[Math.floor(Math.random() * coresAtaque.length)];

            // Cria embed com a imagem e a frase
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
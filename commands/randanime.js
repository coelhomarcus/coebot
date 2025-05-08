const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randanime')
        .setDescription('✨ Envia uma imagem aleatória de anime')
        .addStringOption(option =>
            option.setName('tipo')
                .setDescription('Escolha entre conteúdo SFW ou NSFW')
                .setRequired(true)
                .addChoices(
                    { name: 'SFW', value: 'sfw' },
                    { name: 'NSFW', value: 'nsfw' }
                )),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const tipo = interaction.options.getString('tipo');

            const sfwEndpoints = [
                'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle',
                'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug',
                'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive',
                'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill',
                'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'
            ];

            const nsfwEndpoints = [
                'waifu', 'neko', 'trap', 'blowjob'
            ];

            const endpoints = tipo === 'sfw' ? sfwEndpoints : nsfwEndpoints;
            const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

            const response = await fetch(`https://api.waifu.pics/${tipo}/${randomEndpoint}`);
            const data = await response.json();
            const imageUrl = data.url;

            const coresPastel = [
                0xFFB7B7, // rosa claro
                0xFFDDB7, // pêssego
                0xFFFFB7, // amarelo pastel
                0xB7FFB7, // verde pastel
                0xB7FFFF, // ciano pastel
                0xB7B7FF, // azul pastel
                0xFFB7FF  // lilás pastel
            ];
            const corAleatoria = coresPastel[Math.floor(Math.random() * coresPastel.length)];

            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setImage(imageUrl);

            await interaction.editReply({
                embeds: [embed]
            });

        } catch (error) {
            console.error('Erro ao executar comando randomAnime:', error);
            await interaction.followUp({
                content: '❌ Ocorreu um erro ao buscar a imagem. Por favor, tente novamente mais tarde!',
                ephemeral: true
            });
        }
    },
};
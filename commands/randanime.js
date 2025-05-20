const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randanime')
        .setDescription('✨ Envia uma imagem aleatória de anime')
        .addStringOption(option =>
            option.setName('tipo')
                .setDescription('Escolha entre imagem normal ou nsfw')
                .setRequired(true)
                .addChoices(
                    { name: 'Normal', value: 'sfw' },
                    { name: 'NSFW🔞 ', value: 'nsfw' }
                )),    async execute(interaction) {
        await interaction.deferReply();
        
        try {            
            const tipo = interaction.options.getString('tipo');
            
            if (tipo === 'nsfw') {
                if (!interaction.channel || interaction.channel.type !== 0 || !interaction.channel.nsfw) {
                    return interaction.editReply({
                        content: '❌ Esse conteúdo só pode ser exibido em chats NSFW!',
                        ephemeral: true
                    });
                }
            }

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
                0xFFB7B7,
                0xFFDDB7,
                0xFFFFB7,
                0xB7FFB7,
                0xB7FFFF,
                0xB7B7FF,
                0xFFB7FF
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
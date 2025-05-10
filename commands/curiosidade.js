const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('curiosidade')
        .setDescription('🤓 Mostra uma curiosidade aleatória'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');

            if (!response.ok) {
                return interaction.editReply({
                    content: '❌ Não foi possível obter um fato inútil. Por favor, tente novamente mais tarde.',
                    ephemeral: true
                });
            }

            const data = await response.json();
            const textoOriginal = data.text;
            let textoTraduzido;

            try {
                const textoParaTraduzir = encodeURIComponent(textoOriginal);
                const translateResponse = await fetch(`https://lingva.ml/api/v1/en/pt/${textoParaTraduzir}`);

                if (translateResponse.ok) {
                    const translateData = await translateResponse.json();
                    textoTraduzido = translateData.translation;
                } else {
                    try {
                        const altTranslateResponse = await fetch(`https://lingva.pussthecat.org/api/v1/en/pt/${textoParaTraduzir}`);
                        if (altTranslateResponse.ok) {
                            const altTranslateData = await altTranslateResponse.json();
                            textoTraduzido = altTranslateData.translation;
                        } else {
                            textoTraduzido = textoOriginal;
                            console.error('Erro na tradução, usando texto original');
                        }
                    } catch (error) {
                        textoTraduzido = textoOriginal;
                        console.error('Erro na tradução alternativa, usando texto original');
                    }
                }
            } catch (translateError) {
                textoTraduzido = textoOriginal;
                console.error('Erro ao conectar ao serviço de tradução:', translateError);
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FFAA)
                .setTitle('🤓 Curiosidade')
                .setDescription(textoTraduzido)

            await interaction.editReply({
                embeds: [embed]
            });

        } catch (error) {
            console.error('Erro ao buscar fato inútil:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar um fato inútil. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
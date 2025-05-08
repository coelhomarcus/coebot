const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('conselho')
        .setDescription('🔮 Receba um conselho sábio para a sua vida'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await fetch('https://api.adviceslip.com/advice');

            if (!response.ok) {
                return interaction.editReply({
                    content: '❌ Não foi possível obter um conselho. Por favor, tente novamente mais tarde.',
                    ephemeral: true
                });
            }

            const data = await response.json();
            const conselhoOriginal = data.slip.advice;
            let conselhoTraduzido;

            try {
                const textoParaTraduzir = encodeURIComponent(conselhoOriginal);
                const translateResponse = await fetch(`https://lingva.ml/api/v1/en/pt/${textoParaTraduzir}`);

                if (translateResponse.ok) {
                    const translateData = await translateResponse.json();
                    conselhoTraduzido = translateData.translation;
                } else {
                    try {
                        // Tentando a API alternativa se a primeira falhar
                        const altTranslateResponse = await fetch(`https://lingva.pussthecat.org/api/v1/en/pt/${textoParaTraduzir}`);
                        if (altTranslateResponse.ok) {
                            const altTranslateData = await altTranslateResponse.json();
                            conselhoTraduzido = altTranslateData.translation;
                        } else {
                            conselhoTraduzido = conselhoOriginal;
                            console.error('Erro na tradução do conselho, usando texto original');
                        }
                    } catch (error) {
                        conselhoTraduzido = conselhoOriginal;
                        console.error('Erro na tradução alternativa do conselho, usando texto original');
                    }
                }
            } catch (translateError) {
                conselhoTraduzido = conselhoOriginal;
                console.error('Erro ao conectar ao serviço de tradução para o conselho:', translateError);
            }

            const coresSabedoria = [
                0x9370DB, // Medium Purple
                0x8A2BE2, // Blue Violet
                0x7B68EE, // Medium Slate Blue
                0x6A5ACD, // Slate Blue
                0x483D8B, // Dark Slate Blue
            ];
            const corAleatoria = coresSabedoria[Math.floor(Math.random() * coresSabedoria.length)];

            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setTitle('🔮 Conselho do Dia')
                .setDescription(conselhoTraduzido)

            await interaction.editReply({
                embeds: [embed]
            });

        } catch (error) {
            console.error('Erro ao buscar conselho:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar um conselho. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
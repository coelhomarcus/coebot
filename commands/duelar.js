const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duelar')
        .setDescription('⚔️ Duele com alguém do servidor')
        .addUserOption(option =>
            option.setName('oponente')
                .setDescription('Quem você deseja desafiar para um duelo')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const oponente = interaction.options.getUser('oponente');
            const autor = interaction.user;

            if (oponente.id === autor.id) {
                return await interaction.editReply('❌ Você não pode duelar contra si mesmo! Escolha outro adversário.');
            }

            const autorVenceu = Math.random() > 0.5;
            const vencedor = autorVenceu ? autor : oponente;
            // const perdedor = autorVenceu ? oponente : autor;

            let frases;
            if (autorVenceu) {
                frases = [
                    `${autor} venceu ${oponente} em um duelo!`,
                    `${autor} derrotou ${oponente} com maestria!`,
                    `${oponente} foi derrotado por ${autor} em um duelo intenso!`,
                    `Vitória! ${autor} triunfou sobre ${oponente} em combate!`,
                    `${autor} prevaleceu no duelo contra ${oponente}!`,
                    `${autor} esmagou ${oponente} sem piedade!`,
                    `${autor} mostrou toda sua força contra ${oponente}!`,
                ];
            } else {
                frases = [
                    `${oponente} venceu ${autor} em um duelo!`,
                    `${oponente} derrotou ${autor} com habilidade superior!`,
                    `${autor} foi derrotado por ${oponente} em um duelo acirrado!`,
                    `Derrota! ${autor} sucumbiu ao poder de ${oponente}!`,
                    `${oponente} emergiu vitorioso no duelo contra ${autor}!`,
                    `${oponente} esmagou ${autor} sem misericórdia!`,
                    `${oponente} demonstrou superioridade contra ${autor}!`,
                ];
            }

            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
            
            const waifuEndpoints = ['slap', 'kill', 'kick'];
            let imageUrl = null;
            
            try {
                const waifuEndpoint = waifuEndpoints[Math.floor(Math.random() * waifuEndpoints.length)];
                const response = await fetch(`https://api.waifu.pics/sfw/${waifuEndpoint}`);
                
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.url) {
                        imageUrl = data.url;
                    }
                }
            } catch (apiError) {
                console.error('Erro na API waifu.pics:', apiError);
            }
            
            if (!imageUrl) {
                imageUrl = 'https://i.pinimg.com/originals/0f/2d/b4/0f2db49203f971357f7d32a62672c650.gif';
            }

            const coresDuelo = [
                0xFF0000, // Vermelho
                0xE53935, // Vermelho material
                0xFF5252, // Vermelho claro material
                0x800000, // Bordô
                0x4B0082, // Índigo
                0x8A2BE2, // Azul violeta
                0x9400D3, // Violeta escuro
                0x000000  // Preto
            ];
            const corAleatoria = coresDuelo[Math.floor(Math.random() * coresDuelo.length)];

            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setTitle('Duelo')
                .setDescription(`**${fraseAleatoria}**`)
                .setImage(imageUrl)
                .setFooter({ text: `${vencedor.username} é o grande vencedor!` });

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando duelo:', error);
            await interaction.editReply({
                content: '❌ Algo deu errado durante o duelo. Os adversários foram dispensados!'
            });
        }
    },
};
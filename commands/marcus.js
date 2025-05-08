const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('marcus')
        .setDescription('🌐 Mostra os sites do Marcus Coelho'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const embed = new EmbedBuilder()
                .setColor(0x00ACED) // Cor azul
                .setTitle('@coelhomarcus')
                .setDescription('Confira os sites e redes sociais do Marcus:')
                .addFields(
                    { name: '🌐 Site Pessoal', value: '[coelhomarcus.com](https://coelhomarcus.com)' },
                    { name: '🎙️ CafunTalk', value: '[cafuntalk.com](https://cafuntalk.com)' },
                    { name: '💻 GitHub', value: '[github.com/coelhomarcus](https://github.com/coelhomarcus)' }
                )
                .setThumbnail('https://github.com/coelhomarcus.png')
                .setFooter({ text: 'Obrigado por visitar!' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando marcus:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao mostrar os sites do Marcus. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
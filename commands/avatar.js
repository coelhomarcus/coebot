const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('🖼️ Mostra o avatar em tamanho grande')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário para mostrar o avatar (opcional)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const targetUser = interaction.options.getUser('usuario') || interaction.user;

            const embed = new EmbedBuilder()
                .setColor(0x5865F2)
                .setTitle(`Avatar de ${targetUser.username}`)
                .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 4096 }))
                .setFooter({ text: `Solicitado por ${interaction.user.username}` });

            const avatarURL = targetUser.displayAvatarURL({ dynamic: true, size: 4096 });

            await interaction.editReply({
                content: `[Abrir no navegador](${avatarURL})`,
                embeds: [embed]
            });

        } catch (error) {
            console.error('Erro ao obter avatar do usuário:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar o avatar do usuário. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info-usuario')
        .setDescription('👤 Exibe informações sobre um usuário')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário para exibir informações (opcional)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const targetUser = interaction.options.getUser('usuario') || interaction.user;
            const member = interaction.guild?.members.cache.get(targetUser.id);

            const createdAt = targetUser.createdAt;
            const createdAtFormatted = `${createdAt.toLocaleDateString()} (${Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24))} dias atrás)`;

            let joinedAtFormatted = 'N/A';
            let rolesList = 'Nenhum';

            if (member && interaction.guild) {
                const joinedAt = member.joinedAt;
                joinedAtFormatted = `${joinedAt.toLocaleDateString()} (${Math.floor((Date.now() - joinedAt) / (1000 * 60 * 60 * 24))} dias atrás)`;

                const roles = member.roles.cache
                    .filter(role => role.id !== interaction.guild.id)
                    .sort((a, b) => b.position - a.position)
                    .map(role => `<@&${role.id}>`)
                    .join(', ');

                rolesList = roles || 'Nenhum';
            }

            let userStatus = 'Não disponível no servidor';
            if (member) {
                userStatus = member.presence ? `${getStatusEmoji(member.presence.status)} ${getStatusText(member.presence.status)}` : '🔘 Desconhecido';
            }

            const badges = getUserBadges(targetUser);

            const embed = new EmbedBuilder()
                .setColor(member?.displayColor || 0x5865F2)
                .setTitle(`Informações de ${targetUser.username}`)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 1024 }))
                .addFields(
                    {
                        name: '📝 Informações Gerais',
                        value: `**ID:** ${targetUser.id}\n**Tag:** ${targetUser.tag}\n**Criado em:** ${createdAtFormatted}`,
                        inline: false
                    },
                    {
                        name: '🏷️ Emblemas',
                        value: badges || 'Nenhum',
                        inline: false
                    }
                );

            if (member && interaction.guild) {
                embed.addFields(
                    {
                        name: '📊 Informações no Servidor',
                        value: `**Entrou em:** ${joinedAtFormatted}\n**Status:** ${userStatus}`,
                        inline: false
                    },
                    {
                        name: `🎭 Cargos [${member.roles.cache.size - 1}]`,
                        value: rolesList.length > 1024 ? rolesList.substring(0, 1021) + '...' : rolesList,
                        inline: false
                    }
                );

                if (member.banner) {
                    embed.setImage(member.bannerURL({ size: 1024 }));
                }
            }

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar as informações do usuário. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};

function getStatusEmoji(status) {
    switch (status) {
        case 'online': return '🟢';
        case 'idle': return '🟡';
        case 'dnd': return '🔴';
        case 'offline': return '⚫';
        default: return '🔘';
    }
}

function getStatusText(status) {
    switch (status) {
        case 'online': return 'Online';
        case 'idle': return 'Ausente';
        case 'dnd': return 'Não perturbe';
        case 'offline': return 'Offline/Invisível';
        default: return 'Desconhecido';
    }
}

function getUserBadges(user) {
    const badgeFlags = {
        STAFF: { emoji: '👨‍💼', name: 'Equipe Discord' },
        PARTNER: { emoji: '🤝', name: 'Parceiro Discord' },
        HYPESQUAD: { emoji: '🏠', name: 'HypeSquad Events' },
        BUG_HUNTER_LEVEL_1: { emoji: '🐛', name: 'Caçador de Bugs (Nível 1)' },
        BUG_HUNTER_LEVEL_2: { emoji: '🐛', name: 'Caçador de Bugs (Nível 2)' },
        HYPESQUAD_ONLINE_HOUSE_1: { emoji: '🏠', name: 'Casa Bravery' },
        HYPESQUAD_ONLINE_HOUSE_2: { emoji: '🏠', name: 'Casa Brilliance' },
        HYPESQUAD_ONLINE_HOUSE_3: { emoji: '🏠', name: 'Casa Balance' },
        PREMIUM_EARLY_SUPPORTER: { emoji: '👑', name: 'Apoiador Inicial' },
        VERIFIED_BOT_DEVELOPER: { emoji: '👨‍💻', name: 'Desenvolvedor de Bot Verificado' },
        DISCORD_CERTIFIED_MODERATOR: { emoji: '🛡️', name: 'Moderador Certificado' },
        ACTIVE_DEVELOPER: { emoji: '👨‍💻', name: 'Desenvolvedor Ativo' }
    };

    const userFlags = user.flags ? user.flags.toArray() : [];
    if (userFlags.length === 0) return 'Nenhum';

    return userFlags
        .filter(flag => badgeFlags[flag])
        .map(flag => `${badgeFlags[flag].emoji} ${badgeFlags[flag].name}`)
        .join('\n');
}
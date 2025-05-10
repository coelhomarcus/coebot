const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info-server')
        .setDescription('📊 Exibe informações sobre o servidor atual'),

    async execute(interaction) {
        const guild = interaction.guild;

        if (!guild) {
            return interaction.reply({
                content: '❌ Este comando só pode ser usado em servidores!',
                ephemeral: true
            });
        }

        await interaction.deferReply();

        try {
            await guild.fetch();

            const createdAt = guild.createdAt;
            const createdAtFormatted = `${createdAt.toLocaleDateString()} (${Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24))} dias atrás)`;

            const totalMembers = guild.memberCount;
            const botCount = guild.members.cache.filter(member => member.user.bot).size;
            const humanCount = totalMembers - botCount;

            const textChannels = guild.channels.cache.filter(c => c.type === 0).size;
            const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
            const categoryChannels = guild.channels.cache.filter(c => c.type === 4).size;
            const forumChannels = guild.channels.cache.filter(c => c.type === 15).size;

            const roleCount = guild.roles.cache.size - 1;

            const regularEmojis = guild.emojis.cache.filter(emoji => !emoji.animated).size;
            const animatedEmojis = guild.emojis.cache.filter(emoji => emoji.animated).size;

            const boostLevel = guild.premiumTier ? `Nível ${guild.premiumTier}` : 'Nenhum';
            const boostCount = guild.premiumSubscriptionCount || 0;

            const embed = new EmbedBuilder()
                .setColor(0x5865F2)
                .setTitle(`${guild.name}`)
                .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
                .addFields(
                    {
                        name: '📝 Informações Gerais',
                        value: `**ID:** ${guild.id}\n**Dono:** <@${guild.ownerId}>\n**Criado em:** ${createdAtFormatted}`,
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    {
                        name: '👥 Membros',
                        value: `**Total:** ${totalMembers}\n**Humanos:** ${humanCount}\n**Bots:** ${botCount}`,
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    {
                        name: '💬 Canais',
                        value: `**Total:** ${guild.channels.cache.size}\n**Texto:** ${textChannels}\n**Voz:** ${voiceChannels}\n**Categoria:** ${categoryChannels}${forumChannels > 0 ? `\n**Fórum:** ${forumChannels}` : ''}`,
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    {
                        name: '✨ Outros',
                        value: `**Cargos:** ${roleCount}\n**Emojis:** ${regularEmojis + animatedEmojis}\n**Impulsos:** ${boostCount} (${boostLevel})`,
                        inline: false
                    }
                );

            if (guild.banner) {
                embed.setImage(guild.bannerURL({ size: 1024 }));
            }

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao obter informações do servidor:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar as informações do servidor. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gh-perfil')
        .setDescription('🔍 Busca informações sobre um usuário do GitHub')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Nome de usuário no GitHub')
                .setRequired(true)),

    async execute(interaction) {
        const username = interaction.options.getString('username');

        await interaction.deferReply();

        try {
            const userResponse = await fetch(`https://api.github.com/users/${username}`);

            if (!userResponse.ok) {
                return interaction.editReply({
                    content: `⚠️ **Usuário não encontrado!**\nNão foi possível encontrar \`${username}\`. Verifique se o nome está correto.`,
                    ephemeral: true
                });
            }

            const userData = await userResponse.json();

            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=3`);
            const reposData = await reposResponse.json();

            const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`);
            const eventsData = await eventsResponse.json();

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`👤 ${userData.name || userData.login}`)
                .setURL(userData.html_url)
                .setDescription(userData.bio || 'Sem biografia')
                .setThumbnail(userData.avatar_url)
                .addFields(
                    {
                        name: '📊 Estatísticas',
                        value: `📦 **${formatNumber(userData.public_repos)}** Repositórios\n` +
                            `👥 **${formatNumber(userData.followers)}** Seguidores\n` +
                            `👤 **${formatNumber(userData.following)}** Seguindo`,
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    }
                );

            const detailsArray = [];
            if (userData.company) detailsArray.push(`🏢 **Empresa**: ${userData.company}`);
            if (userData.location) detailsArray.push(`📍 **Localização**: ${userData.location}`);
            if (userData.blog) detailsArray.push(`🔗 [${userData.blog}](${userData.blog.startsWith('http') ? userData.blog : 'https://' + userData.blog})`);
            if (userData.twitter_username) detailsArray.push(`🐦 **Twitter**: [@${userData.twitter_username}](https://twitter.com/${userData.twitter_username})`);
            if (userData.email) detailsArray.push(`📧 **Email**: ${userData.email}`);

            if (detailsArray.length > 0) {
                embed.addFields(
                    {
                        name: '📝 Detalhes',
                        value: detailsArray.join('\n'),
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    }
                );
            }

            if (reposData.length > 0 && !reposResponse.message) {
                const topRepos = reposData
                    .map(repo => `[${repo.name}](${repo.html_url}) - ⭐ ${formatNumber(repo.stargazers_count)}`)
                    .join('\n');

                embed.addFields(
                    {
                        name: '🌟 Principais Repositórios',
                        value: topRepos || 'Nenhum repositório encontrado',
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    });
            }

            if (eventsData.length > 0 && !eventsResponse.message) {
                const latestActivities = eventsData
                    .slice(0, 3)
                    .map(event => {
                        const date = new Date(event.created_at).toLocaleDateString();
                        let activityDesc = '';

                        switch (event.type) {
                            case 'PushEvent':
                                activityDesc = `📝 Push para ${event.repo.name}`;
                                break;
                            case 'CreateEvent':
                                activityDesc = `🆕 Criou ${event.payload.ref_type} em ${event.repo.name}`;
                                break;
                            case 'PullRequestEvent':
                                activityDesc = `🔄 PR em ${event.repo.name}`;
                                break;
                            case 'IssuesEvent':
                                activityDesc = `❗ Issue em ${event.repo.name}`;
                                break;
                            case 'ForkEvent':
                                activityDesc = `🍴 Fork de ${event.repo.name}`;
                                break;
                            case 'WatchEvent':
                                activityDesc = `⭐ Favoritou ${event.repo.name}`;
                                break;
                            default:
                                activityDesc = `Atividade em ${event.repo.name}`;
                        }

                        return `${activityDesc} - ${date}`;
                    })
                    .join('\n');

                embed.addFields(
                    {
                        name: '📅 Atividades Recentes',
                        value: latestActivities || 'Nenhuma atividade recente',
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    }
                );
            }

            embed.setFooter({
                text: `Membro desde ${new Date(userData.created_at).toLocaleDateString()}`
            });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Perfil')
                        .setURL(userData.html_url)
                        .setStyle(ButtonStyle.Link)
                        .setEmoji('👤')
                );
            row.addComponents(
                new ButtonBuilder()
                    .setLabel('Repositórios')
                    .setURL(`${userData.html_url}?tab=repositories`)
                    .setStyle(ButtonStyle.Link)
                    .setEmoji('📦')
            );

            await interaction.editReply({
                embeds: [embed],
                components: [row]
            });

        } catch (error) {
            console.error('Erro ao buscar informações do usuário do GitHub:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar as informações do usuário do GitHub. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};

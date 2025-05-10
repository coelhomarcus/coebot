const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function getColorForLanguage(language) {
    const colors = {
        'JavaScript': 0xF7DF1E,
        'TypeScript': 0x3178C6,
        'Python': 0x3776AB,
        'Java': 0xED8B00,
        'C#': 0x239120,
        'PHP': 0x777BB4,
        'C++': 0xF34B7D,
        'Ruby': 0xCC342D,
        'Go': 0x00ADD8,
        'Rust': 0xDEA584,
        'HTML': 0xE34F26,
        'CSS': 0x1572B6,
    };
    return colors[language] || 0x0099FF;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gh-repo')
        .setDescription('🔍 Busca informações sobre um repositório do GitHub')
        .addStringOption(option =>
            option.setName('owner')
                .setDescription('Dono do repositório')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('repo')
                .setDescription('Nome do repositório')
                .setRequired(true)),

    async execute(interaction) {
        const owner = interaction.options.getString('owner');
        const repo = interaction.options.getString('repo');

        await interaction.deferReply();

        try {
            const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

            if (!repoResponse.ok) {
                return interaction.editReply({
                    content: `⚠️ **Repositório não encontrado!**\nNão foi possível encontrar \`${owner}/${repo}\`. Verifique se o nome está correto.`,
                    ephemeral: true
                });
            }

            const repoData = await repoResponse.json();

            const [contributorsResponse, languagesResponse, commitsResponse] = await Promise.all([
                fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=3`),
                fetch(`https://api.github.com/repos/${owner}/${repo}/languages`),
                fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`)
            ]);

            const contributors = await contributorsResponse.json();
            const languages = await languagesResponse.json();
            const commits = await commitsResponse.json();

            const mainLanguage = repoData.language || 'Não especificada';
            const topLanguages = Object.keys(languages).slice(0, 3).join(', ') || mainLanguage;
            const lastCommitDate = commits.length > 0 ? new Date(commits[0].commit.committer.date) : null;
            const lastCommitMessage = commits.length > 0 ? commits[0].commit.message.split('\n')[0].substring(0, 50) : 'Nenhum commit encontrado';

            const embed = new EmbedBuilder()
                .setColor(getColorForLanguage(mainLanguage))
                .setTitle(`📦 ${repoData.full_name}`)
                .setURL(repoData.html_url)
                .setDescription(repoData.description || 'Sem descrição')
                .setThumbnail(repoData.owner.avatar_url)
                .setAuthor({
                    name: `${repoData.owner.login}`,
                    iconURL: repoData.owner.avatar_url,
                    url: repoData.owner.html_url
                })
                .addFields(
                    {
                        name: '\u200B',
                        value: ''
                    },
                    {
                        name: '',
                        value: `⭐ **${formatNumber(repoData.stargazers_count)}** Estrelas\n` +
                            `🍴 **${formatNumber(repoData.forks)}** Forks\n` +
                            `👁️ **${formatNumber(repoData.watchers)}** Observadores\n`
                    },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    {
                        name: '💻 Linguagens',
                        value: topLanguages,
                        inline: false
                    },
                    {
                        name: '\u200B',
                        value: ''
                    }
                );

            if (lastCommitDate) {
                embed.addFields(
                    {
                        name: '📝 Último commit',
                        value: `\`${lastCommitMessage}\` - ${lastCommitDate.toLocaleDateString()}`
                    },
                    {
                        name: '\u200B',
                        value: ''
                    });
            }

            if (contributors.length > 0 && !repoResponse.message) {
                const topContributors = contributors
                    .slice(0, 3)
                    .map(c => `[${c.login}](${c.html_url}) (${c.contributions} commits)`)
                    .join('\n');

                embed.addFields(
                    {
                        name: '👥 Contribuidores',
                        value: topContributors
                    },
                    {
                        name: '\u200B',
                        value: ''
                    });
            }

            if (repoData.license) {
                embed.setFooter({
                    text: `Licença: ${repoData.license.name || 'Desconhecida'} • Criado em ${new Date(repoData.created_at).toLocaleDateString()}`
                });
            } else {
                embed.setFooter({
                    text: `Sem licença especificada • Criado em ${new Date(repoData.created_at).toLocaleDateString()}`
                });
            }

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Repositório')
                        .setURL(repoData.html_url)
                        .setStyle(ButtonStyle.Link)
                        .setEmoji('📦')
                );

            if (repoData.has_downloads) {
                row.addComponents(
                    new ButtonBuilder()
                        .setLabel('Releases')
                        .setURL(`${repoData.html_url}/releases`)
                        .setStyle(ButtonStyle.Link)
                        .setEmoji('📋')
                );
            }

            await interaction.editReply({
                embeds: [embed],
                components: [row]
            });

        } catch (error) {
            console.error('Erro ao buscar informações do GitHub:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar as informações do repositório. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
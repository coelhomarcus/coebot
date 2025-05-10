const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('📚 Exibe a lista de todos os comandos disponíveis'),
    async execute(interaction) {
        await interaction.deferReply();

        const categorias = {
            'Anime': {
                emoji: '🍙',
                comandos: [
                    { name: 'randanime', description: 'Exibe uma imagem aleatória de anime' },
                    { name: 'waifu', description: 'Cria uma waifu aleatória' },
                    { name: 'otakometro', description: 'Mede o nível de otaku' }
                ]
            },
            'Diversão': {
                emoji: '😂',
                comandos: [
                    { name: 'atacar', description: 'Ataca outro usuário' },
                    { name: 'beijar', description: 'Beija outro usuário' },
                    { name: 'conselho', description: 'Receba um conselho aleatório' },
                    { name: 'curiosidade', description: 'Exibe uma curiosidade aleatória' },
                    { name: 'ler-mente', description: 'Lê a mente de alguém' },
                ]
            },
            'Dev': {
                emoji: '💻',
                comandos: [
                    { name: 'gh-perfil', description: 'Exibe um perfil do GitHub' },
                    { name: 'gh-repo', description: 'Exibe um repositório no GitHub' }
                ]
            },
            'Outros': {
                emoji: '🔍',
                comandos: [
                    { name: 'avatar', description: 'Exibe o avatar de um usuário' },
                    { name: 'info-server', description: 'Exibe informações sobre o servidor' },
                    { name: 'info-usuario', description: 'Exibe informações sobre um usuário' }
                ]
            }
        };

        // Calcular o número total de comandos
        let totalComandos = 0;
        for (const categoria in categorias) {
            totalComandos += categorias[categoria].comandos.length;
        }

        const embed = new EmbedBuilder()
            .setColor(0x7CFC00)
            .setTitle('Lista de Comandos')
            .setFooter({ text: `Total de comandos: ${totalComandos}` });

        // Adicionar campos para cada categoria
        for (const categoriaNome in categorias) {
            const categoria = categorias[categoriaNome];
            const comandosLista = categoria.comandos
                .map(cmd => `\`/${cmd.name}\` ➞ ${cmd.description}`)
                .join('\n');
            embed.addFields(
                {
                    name: `${categoria.emoji} ${categoriaNome}`,
                    value: comandosLista
                },
                {
                    name: '\u200B',
                    value: ''
                }
            );
        }

        await interaction.editReply({ embeds: [embed] });
    },
};

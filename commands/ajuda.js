const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('📚 Exibe a lista de todos os comandos disponíveis'), async execute(interaction) {
            await interaction.deferReply();

            const commandsPath = path.join(__dirname);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            // Caso seja a lista completa de comandos
            const commands = [];

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                if ('data' in command && 'execute' in command) {
                    commands.push({
                        name: command.data.name,
                        description: command.data.description
                    });
                }
            }

            // Agrupar comandos por categorias (baseado nos primeiros caracteres da descrição)
            const categorias = {
                '👤': { nome: 'Informações', comandos: [] },
                '🎮': { nome: 'Diversão', comandos: [] },
                '🛠️': { nome: 'Utilitários', comandos: [] },
                '📚': { nome: 'Ajuda', comandos: [] },
                'outros': { nome: 'Outros', comandos: [] }
            };

            for (const cmd of commands) {
                let categorizado = false;

                for (const emoji in categorias) {
                    if (emoji !== 'outros' && cmd.description.startsWith(emoji)) {
                        categorias[emoji].comandos.push(cmd);
                        categorizado = true;
                        break;
                    }
                }

                if (!categorizado) {
                    categorias.outros.comandos.push(cmd);
                }
            } const embed = new EmbedBuilder()
                .setColor(0x5865F2)
                .setTitle('📚 Lista de Comandos')
                .setDescription('Aqui estão todos os comandos disponíveis.')
                .setFooter({ text: `Total de comandos: ${commands.length}` });

            // Adicionar campos para cada categoria que tenha comandos
            for (const categoria in categorias) {
                if (categorias[categoria].comandos.length > 0) {
                    const comandosLista = categorias[categoria].comandos
                        .map(cmd => `\`/${cmd.name}\` - ${cmd.description}`)
                        .join('\n');

                    embed.addFields({
                        name: `${categoria !== 'outros' ? categoria + ' ' : ''}${categorias[categoria].nome}`,
                        value: comandosLista
                    });
                }
            }

            await interaction.editReply({ embeds: [embed] });
        },
};

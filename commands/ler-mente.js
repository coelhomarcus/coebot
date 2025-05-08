const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ler-mente')
        .setDescription('🔮 Finge ler os pensamentos de um usuário')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário para ler a mente')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const targetUser = interaction.options.getUser('usuario');

            const pensamentos = [
                "Acordei me sentindo o Luffy: com fome e sem rumo.",
                "Se eu tivesse uma Pokébola, já teria tentado capturar meu gato umas cinco vezes.",
                "Sempre quis lançar um Kamehameha... mas só sai espirro.",
                "Se alguém gritar 'Objection!' eu automaticamente viro o Phoenix Wright na discussão.",
                "Toda vez que escuto 'It's-a me, Mario!' lembro que minha vida não tem power-ups.",
                "Meu cabelo bagunçado hoje parece mais um easter egg do Goku no modo Super Saiyajin 1.5.",
                "Se eu sumir, provavelmente entrei em uma side quest aleatória.",
                "Joguei tanto The Sims que comecei a achar que minha planta morreu porque eu deletei a geladeira.",
                "Meu espírito animal é o Majin Buu: comilão, confuso e de bom coração.",
                "Meu guarda-roupa tem mais camisetas de anime do que roupas sociais. Prioridades.",
                "Se tivesse um cheat code pra lavar a louça, eu usava sem pensar.",
                "Hoje me sinto um Magikarp: inútil, mas esperando meu momento de virar Gyarados.",
                "Se tivesse um torneio de ficar no sofá, eu ganhava até do Zoro dormindo em batalha.",
                "Sinto que tô vivendo um tutorial eterno e ninguém me deu o botão de 'pular'.",
                "Coloquei o despertador em modo 'boss fight'. Perdi 3 vezes hoje.",
                "Se minha vida fosse um anime, hoje seria o episódio de recapitulação.",
                "Abri a geladeira com esperança de encontrar uma poção de mana. Só tinha brócolis.",
                "Meu humor muda mais rápido que transformação de Sailor Moon.",
                "Tentei usar um Hadouken no colega chato... agora tô no RH explicando.",
                "Tô igual o Yugi: tenho dois lados, o sério e o que faz piada com tudo."
            ];

            const pensamentoAleatorio = pensamentos[Math.floor(Math.random() * pensamentos.length)];

            const embed = new EmbedBuilder()
                .setColor(0x9C44FB)
                .setTitle(`💭 Lendo a mente de ${targetUser.username}...`)
                .setDescription(`**${targetUser} está pensando:**\n\n*"${pensamentoAleatorio}"*`)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao ler a mente:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao tentar ler a mente. Os pensamentos estão muito confusos!',
                ephemeral: true
            });
        }
    },
};
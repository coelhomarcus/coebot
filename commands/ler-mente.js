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
                "Se eu sumir, provavelmente entrei em uma side quest aleatória.",
                "Tenho tanto sono que nem uma poção de MP Full ia resolver.",
                "Quando levanto da cadeira meus joelhos fazem o mesmo barulho que os ossos do Sans.",
                "Comecei a chamar meus problemas de 'side quests' para ficarem mais interessantes.",
                "Minha memória tem menos espaço livre que um Memory Card de PS1.",
                "Queria que a vida tivesse DLC pra eu escolher só as partes boas.",
                "Toda segunda-feira é igual lutar contra o boss final sem ter feito nenhuma missão secundária.",
                "Tô tão cansado que se fosse um Sims, minha barra de energia estaria vermelha.",
                "Preciso de um power-up urgente ou vou falhar na fase 'acordar cedo'.",
                "Se a vida tivesse achievements, eu estaria caçando os mais fáceis.",
                "Minha vida tá mais difícil que enfrentar o Ornstein e Smough sem armadura.",
                "Se eu cair mais uma vez hoje, vou deixar uma mancha de alma no chão do escritório.",
                "Fui ao mercado e voltei me sentindo como depois de um boss fight em Elden Ring.",
                "Minhas metas de vida parecem um inimigo com barra de vida escondida.",
                "O despertador tocou e eu só pensei: 'Você morreu'.",
                "Hoje a escada da empresa virou meu próprio Blighttown.",
                "Se a vida é um Soulslike, eu nasci com build errada e sem estus flask.",
                "Cada segunda-feira é uma nova fogueira que eu não queria acender.",
                "Sair da cama de manhã é mais difícil que derrotar o Malenia sem tomar hit.",
                "Acordei do sonho apenas para lembrar que a vigília é o verdadeiro pesadelo.",
                "Cada passo fora de casa é uma peregrinação sem mapa, guiada apenas por ecos esquecidos.",
                "No espelho, vejo não um rosto, mas um avatar gasto por incontáveis ressurreições.",
                "Hoje o café foi minha única fogueira: quente, amarga e temporária.",
                "O mundo não me odeia. Ele apenas observa, em silêncio, enquanto falho mais uma vez.",
                "Algumas dores não têm barra de vida — apenas persistem, como status 'maldição'.",
                "Falo com as pessoas como se fossem NPCs: sempre com as mesmas falas, esperando escolhas que nunca mudo.",
                "Meu humor oscila como a lua em Yharnam: belo, distante e assustador.",
                "Cada notificação no celular soa como o sino de um novo julgamento.",
                "Meu corpo vai ao trabalho, mas minha alma ainda está presa naquela última boss fight emocional.",
                "Existe uma tristeza estranha em saber que, mesmo após morrer mil vezes, ninguém sente sua ausência.",
                "Entre um deadline e outro, encontrei uma fogueira. Descansei... mas o mundo não.",
                "A ansiedade é como um inimigo invisível: ataca antes mesmo de ser notado.",
                "Já não sei se estou farmando experiência ou apenas me perdendo em repetições vazias.",
                "A esperança é um item raro. E como todo item raro... dificilmente aparece duas vezes.",
                "Hoje tentei invocar ajuda, mas parecia que todos estavam em suas próprias batalhas.",
                "Minha mente vive em New Game+, mas meu corpo insiste em andar como se fosse o tutorial.",
                "Há beleza na derrota. Mas confesso: eu preferia ter vencido dessa vez.",
                "Se o mundo for realmente um ciclo, talvez um dia eu descubra onde foi que errei no primeiro giro.",
                "Aceitei o peso da existência como se fosse uma armadura: pesada, mas necessária para continuar."
            ];


            const pensamentoAleatorio = pensamentos[Math.floor(Math.random() * pensamentos.length)];

            const embed = new EmbedBuilder()
                .setColor(0x9C44FB)
                .setTitle(`🔮 Lendo a mente de ${targetUser.displayName}`)
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
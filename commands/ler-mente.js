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
                "Eu realmente espero que ninguém descubra que tenho uma coleção secreta de meias de abacate.",
                "Por que ninguém percebe que sou na verdade três gatos empilhados em um casaco?",
                "Será que alguém notaria se eu comesse todo o bolo da geladeira agora?",
                "Estou sorrindo, mas na verdade estou imaginando todos como batatas fritas gigantes.",
                "Deveria ter comprado Bitcoin em 2010...",
                "Se eu fingir que entendo o que está acontecendo, talvez ninguém perceba que estou confuso.",
                "Espero que ninguém descubra meu histórico de pesquisa no Google.",
                "Se eu ficar parado o suficiente, talvez eles pensem que sou uma estátua.",
                "Será que me veriam se eu usasse uma capa de invisibilidade?",
                "Eu deveria estar prestando atenção, mas estou imaginando como seria ter superpoderes.",
                "Será que os pombos estão planejando dominar o mundo?",
                "Estou tentando lembrar se tranquei a porta de casa...",
                "O que aconteceria se eu colocasse ketchup no sorvete?",
                "Espero que ninguém perceba que estou usando pijama por baixo dessa roupa.",
                "Ainda bem que ninguém pode ler minha mente de verdade...",
                "Será que os peixes bebem água ou apenas respiram?",
                "Estou com fome. Sempre estou com fome. Por que sempre estou com fome?",
                "Quem foi que inventou o trabalho? Eu só queria ficar em casa jogando videogame.",
                "Será que alguém perceberia se eu simplesmente saísse agora sem falar nada?",
                "Por que estou aqui mesmo? Ah sim, sou obrigado.",
                "Se eu morder um zumbi, ele virará humano ou eu virarei zumbi?",
                "Passei o dia todo acenando para alguém que achei que me conhecia. Nem sei quem era aquela pessoa.",
                "Seria legal ter uma ovelha de estimação. Poderia fazer um suéter com o pelo dela a cada ano.",
                "Se aliens viessem à Terra, será que eles teriam TikTok?",
                "Estou tentando parecer inteligente, mas na verdade estou pensando em macarrão.",
                "Acho que sou o protagonista de um reality show e ninguém me contou ainda.",
                "E se as nuvens tivessem sabor? Aposto que aquela ali é de algodão doce.",
                "Acabei de perceber que faz três dias que não troco de meias.",
                "Se eu correr mais rápido que a velocidade da luz, conseguirei me ver chegando?",
                "Será que os dinossauros achavam que estavam tendo um dia normal quando o meteoro caiu?",
                "Quando estou sozinho, converso com meu reflexo no espelho como se fosse outra pessoa.",
                "Minha vida é basicamente esperar o micro-ondas terminar e depois pegar a comida com 5 segundos restantes.",
                "Tenho medo de que a Inteligência Artificial um dia descubra o que realmente penso dela.",
                "Já mandei mensagem para mim mesmo só para ter uma notificação no celular.",
                "Não sei dançar, mas nos meus pensamentos sou um profissional.",
                "Acho que meu gato pode estar planejando me matar enquanto durmo.",
                "Esqueci o que ia falar... espera, isso foi um pensamento ou falei em voz alta?",
                "Finjo entender política quando na verdade só quero parecer informado.",
                "Às vezes me pergunto se meus eletrodomésticos conversam sobre mim quando saio de casa.",
                "Por que chamamos de 'edifício' se já está construído? Não deveria ser 'construído'?",
            ];

            const pensamentoAleatorio = pensamentos[Math.floor(Math.random() * pensamentos.length)];

            const embed = new EmbedBuilder()
                .setColor(0x9C44FB) // Cor roxa/mística
                .setTitle(`💭 Lendo a mente de ${targetUser.username}...`)
                .setDescription(`**${targetUser} está pensando:**\n\n*"${pensamentoAleatorio}"*`)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: 'Aviso: Este comando é apenas uma brincadeira e não lê mentes de verdade!' });

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
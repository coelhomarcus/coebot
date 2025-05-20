const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const conselhos = [
    "A paciência é a chave para resolver problemas complicados.",
    "Não deixe que o medo de falhar impeça você de tentar.",
    "O conhecimento é o único tesouro que ninguém pode roubar de você.",
    "Aprenda com o ontem, viva para hoje, tenha esperança para o amanhã.",
    "A gratidão transforma o que temos em suficiente.",
    "Seja a mudança que você deseja ver no mundo.",
    "Pequenos passos levam a grandes jornadas.",
    "A persistência realiza o impossível.",
    "Cuide do seu corpo, é o único lugar que você tem para viver.",
    "Trate os outros como você gostaria de ser tratado.",
    "Não compare sua jornada com a dos outros.",
    "Aprenda a valorizar o silêncio.",
    "A maior sabedoria é conhecer a si mesmo.",
    "Aja mesmo quando tiver medo.",
    "Uma mente positiva encontra oportunidades mesmo nas dificuldades.",
    "O sucesso não acontece da noite para o dia, exige consistência.",
    "Cultive bons hábitos, eles definem seu futuro.",
    "Perdoe não porque merecem, mas porque você merece paz.",
    "A criatividade surge quando você se permite explorar o desconhecido.",
    "Não lamente o passado, aprenda com ele.",
    "Ajudar os outros é uma forma de ajudar a si mesmo.",
    "Sua atitude determina sua direção.",
    "A verdadeira felicidade vem de dentro.",
    "O tempo é o recurso mais valioso que você possui.",
    "Quem planta bondade colhe amizade.",
    "Nem tudo que brilha é ouro, nem tudo que parece fácil vale a pena.",
    "Um livro é um amigo que nunca muda de opinião.",
    "Palavras gentis custam pouco, mas valem muito.",
    "Um sorriso pode mudar o dia de alguém.",
    "Supere seus limites um pouco a cada dia.",
    "A melhor maneira de prever o futuro é criá-lo.",
    "Não desista nas dificuldades, elas te fazem mais forte.",
    "Lembre-se de agradecer pelas pequenas coisas da vida.",
    "Quem caminha sozinho pode até chegar mais rápido, mas quem caminha junto chega mais longe.",
    "Respeite a natureza, ela é nossa casa compartilhada.",
    "Pequenas atitudes diárias constroem grandes mudanças.",
    "Quem compartilha conhecimento multiplica sabedoria.",
    "O verdadeiro líder serve aos outros antes de si mesmo.",
    "Antes de falar, escute. Antes de agir, pense.",
    "A vida é como andar de bicicleta: para manter o equilíbrio, você precisa se mover."
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('conselho')
        .setDescription('🔮 Receba um conselho sábio para a sua vida'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const conselhoAleatorio = conselhos[Math.floor(Math.random() * conselhos.length)];

            const coresSabedoria = [
                0x9370DB, // Medium Purple
                0x8A2BE2, // Blue Violet
                0x7B68EE, // Medium Slate Blue
                0x6A5ACD, // Slate Blue
                0x483D8B, // Dark Slate Blue
            ];
            const corAleatoria = coresSabedoria[Math.floor(Math.random() * coresSabedoria.length)];            
            
            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setTitle('🔮 Conselho')
                .setDescription(conselhoAleatorio)

            await interaction.editReply({
                embeds: [embed]
            });

        } catch (error) {
            console.error('Erro ao buscar conselho:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao buscar um conselho. Por favor, tente novamente mais tarde.',
                ephemeral: true
            });
        }
    },
};
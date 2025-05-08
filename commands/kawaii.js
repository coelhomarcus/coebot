const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kawaii')
        .setDescription('✨ Envia uma imagem fofa com mensagem kawaii'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            // Lista de frases kawaii (com o emoji em linha separada)
            const frases = [
                "UwU você ativou o modo kawaii, baka~\n",
                "Nyaa~ Não é como se eu quisesse te mostrar algo kawaii ou algo assim!\n>.<",
                "OwO que isso? Um comando kawaii apareceu!\n*paws excitedly*",
                "Kyaaaa~ Kawaii mode activated! Resistance is futile, desu~!\n<3",
                "Hehe~ Fofura level over 9000! Nani?! Impossível!\nUwU",
                "Mou~ Você pediu por fofura? Aqui está, senpai!\n*blushes*",
                "Nya-nya! Sua dose diária de kawaii chegou, desu~!\n>///<",
                "Uguuu~ Isso é t-tão embaraçoso, mas... e-espero que goste!\n(*≧ω≦)",
                "Rawr~ Isso significa 'estarei aqui para te trazer fofura' em kawaiinês!\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
                "Waifu mode: ON! Preparando protocolo de fofura extrema... desu~!\n",
                "Pomf! Aqui está sua fofura! Yoroshiku onegaishimasu~\n₍˄·͈༝·͈˄₎◞ ̑̑",
                "Etto... V-você não pediu isso porque g-gosta de mim, n-né? Baka!\n>.<",
                "Pyon-pyon~! Saltitando com fofura direto para o seu kokoro!\n(◕‿◕✿)",
                "Moe moe kyun~! Espero que esse raio de fofura atinja seu coração!\n❤(ӦｖӦ｡)",
                "Wan-wan! *inclina a cabeça* Kawaii desu ne?\n:3",
                "Nyan~ Alguém chamou o esquadrão da fofura? Está entregue!\n(=^･ω･^=)",
                "Ganbare! Essa dose de kawaii vai te dar energia para o resto do dia!\n(•̀ᴗ•́)و",
                "Kya~! Meu coração de tsundere não aguenta tanta fofura! B-baka!\n(/>///<)/",
                "Desu desu~! Kawaii power level increasing! System overload!\n⊂(◉‿◉)つ",
                "Moshi moshi? Operadora de kawaii na linha! Como posso ajudar?\nuwu",
                "Doki-doki! Posso sentir seu coração explodindo de fofura!\n*heart goes nyan*",
                "Yatta~! Kawaii achievement unlocked! Você ganhou +10 pontos de moe!\nヾ(≧▽≦*)o",
                "Ara ara~! Não sabia que você gostava tanto assim de coisas fofas! Ufufu~\n(´｡• ᵕ •｡`)",
                "Gao gao~! Até os monstros kawaii atendem seu chamado!\n(●´ω｀●)",
                "Itadakimasu~! Uma porção de fofura pronta para ser consumida!\n┌(★ｏ☆)┘",
                "Suki suki~! Alguém aqui está precisando de um abraço kawaii?\n(づ｡◕‿‿◕｡)づ",
                "Pika pika~! Detectei altos níveis de fofura neste servidor!\n☆⌒(≧▽≦)v",
                "Fuwa fuwa~! Tão fofo e fofinho quanto as nuvens!\n(｡･ω･｡)ﾉ",
                "Hauu~ Omochikaeri~! Quero levar essa fofura para casa!\n(≧◡≦)",
                "Uguu~! T-tanta fofura que nem sei lidar! *windows_shutdown.exe*\n(,,>﹏<,,)"
            ];

            // Tipos de imagens kawaii disponíveis na API (todos SFW)
            const imageTypes = [
                'waifu', 'neko', 'shinobu', 'megumin', 'bully',
                'cuddle', 'cry', 'hug', 'awoo', 'kiss',
                'lick', 'pat', 'smug', 'blush', 'smile',
                'wave', 'happy', 'dance'
            ];

            // Pega um tipo aleatório de imagem
            const randomType = imageTypes[Math.floor(Math.random() * imageTypes.length)];

            // Pega uma frase aleatória
            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

            // Busca uma imagem kawaii aleatória da API
            const response = await fetch(`https://api.waifu.pics/sfw/${randomType}`);
            const data = await response.json();
            const imageUrl = data.url;

            // Define uma cor pastel aleatória para o embed
            const coresPastel = [
                0xFFB7B7, // rosa claro
                0xFFDDB7, // pêssego
                0xFFFFB7, // amarelo pastel
                0xB7FFB7, // verde pastel
                0xB7FFFF, // ciano pastel
                0xB7B7FF, // azul pastel
                0xFFB7FF  // lilás pastel
            ];
            const corAleatoria = coresPastel[Math.floor(Math.random() * coresPastel.length)];

            // Cria embed com a imagem e a frase kawaii
            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setDescription(`***${fraseAleatoria}***`)
                .setImage(imageUrl)

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao executar comando kawaii:', error);
            await interaction.editReply({
                content: '❌ Gomenasai! Ocorreu um erro ao ativar o modo kawaii. Por favor, tente novamente mais tarde, senpai!',
                ephemeral: true
            });
        }
    },
};
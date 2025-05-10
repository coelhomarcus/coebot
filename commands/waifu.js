const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('💕 Gera aleatoriamente uma waifu com uma imagem e descrição absurda'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const nomes = [
                "Sakura", "Yuki", "Hana", "Aoi", "Rin", "Mei", "Mio", "Yui", "Akari", "Nana",
                "Koharu", "Hinata", "Ayaka", "Riko", "Sora", "Haruka", "Misaki", "Kaede", "Yuna", "Miyu",
                "Himari", "Ichika", "Aiko", "Kotone", "Ema", "Tsumugi", "Nanami", "Kokona", "Hikari", "Momoka",
                "Chiyo", "Asuka", "Rumi", "Kanna", "Midori", "Akiko", "Emiko", "Fumiko", "Hanako", "Izumi",
                "Kiyoko", "Ayano", "Reika", "Shiori", "Tomoko", "Umeko", "Yumeko", "Zumi", "Amaya", "Chiasa",
                "Hotaru", "Kaori", "Madoka", "Nozomi", "Sayuri", "Tamaki", "Hitomi", "Megumi", "Chisato", "Kanon"
            ];

            const sobrenomes = [
                "Tanaka", "Sato", "Suzuki", "Takahashi", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Kato",
                "Yoshida", "Yamada", "Sasaki", "Yamaguchi", "Matsumoto", "Inoue", "Kimura", "Hayashi", "Shimizu", "Saito",
                "Nakajima", "Ikeda", "Mori", "Abe", "Hashimoto", "Ishikawa", "Ogawa", "Fujita", "Goto", "Okada",
                "Hasegawa", "Murakami", "Kondo", "Ishii", "Aoki", "Sakamoto", "Endo", "Arai", "Kaneko", "Fujimoto",
                "Takagi", "Nishimura", "Sugawara", "Iwasaki", "Kinoshita", "Noguchi", "Kikuchi", "Maeda", "Hirano", "Takeda",
                "Nakagawa", "Watanuki", "Shirogane", "Hiiragi", "Kamiya", "Kousaka", "Izumi", "Minamoto", "Okazaki", "Kageyama"
            ];

            const personalidades = [
                "Fala apenas em emojis",
                "Se comunica exclusivamente através de letras de anime",
                "Acha que é um personagem de RPG",
                "Trata a vida como se fosse um jogo de namoro",
                "Usa 'nya' no final de cada frase",
                "Acredita ser reencarnação de uma torradeira",
                "Converte qualquer conversa em referências a memes antigos",
                "Só aceita comida em forma de emoji",
                "Se comporta como uma inteligência artificial com bugs",
                "Muda de personalidade com base na fase da lua",
                "Narra sua própria vida em terceira pessoa",
                "Adora fazer cosplay de objetos inanimados",
                "Fala exclusivamente através de citações de videogames",
                "Acha que está sendo filmada 24/7",
                "Só consegue falar ao contrário",
                "Acredita que é uma cebola com várias camadas de personalidade",
                "É alérgica a qualquer palavra com a letra 'R'",
                "Tira selfies imaginárias a cada 5 minutos",
                "Trata todos como NPCs em sua própria aventura",
                "Tem um amigo imaginário tsundere",
                "Só consegue demonstrar emoção através de batalhas de rap",
                "Adora inventar teorias da conspiração sobre desenhos animados",
                "Acredita ser parente distante de um personagem de anime famoso",
                "Classifica todas as situações em níveis de poder de um shounen",
                "Interpreta qualquer frase como uma declaração de amor",
                "Fala como se estivesse narrando um trailer de filme",
                "Acredita possuir uma linhagem sanguínea especial que é mantida em segredo",
                "Se comporta como se estivesse em um RPG online e fica gritando comandos de skill",
                "Fala exclusivamente através de onomatopeias",
                "Refere-se a si mesma em terceira pessoa e acrescenta 'chan' ao final do próprio nome",
                "Sempre usa termos de videogame para se referir a situações cotidianas",
                "Cria um ranking de popularidade mental para todas as pessoas que conhece",
                "Responde de forma dramática a qualquer pergunta simples",
                "Acredita ter um episódio de filler na própria vida a cada domingo",
                "Tem uma imaginária trilha sonora de anime tocando em sua cabeça constantemente",
                "Faz introduções épicas sempre que conhece alguém novo",
                "Usa gírias de animes dos anos 90 que ninguém mais entende",
                "Traduz qualquer emoção em um termo de RPG de status",
                "Organiza a vida com base em temporadas e arcos narrativos",
                "Acredita estar em constante torneio de poder com pessoas aleatórias",
                "Compara tudo ao seu anime favorito que ninguém nunca ouviu falar",
                "Espera que todos reconheçam suas referências obscuras de light novels",
                "Usa técnicas de batalha imaginárias para resolver problemas comuns",
                "Tem um sistema interno de classificação de pessoas por elementos (fogo, água, etc)"
            ];

            const hobbies = [
                "Colecionar poeira de diferentes países",
                "Tricotar roupas para abacates",
                "Fazer cosplay de semáforos",
                "Catalogar diferentes tipos de nuvens em formato de anime",
                "Fazer ASMR com sons de baterias de controle remoto",
                "Decorar números de telefone aleatórios",
                "Fotografar pessoas que fotografam",
                "Treinar formigas para dançar coreografias de K-pop",
                "Catalogar diferentes sons de microondas",
                "Escrever fanfics de objetos domésticos",
                "Desenhar retratos de comidas antes de comê-las",
                "Dublar conversas dos outros em tempo real",
                "Colecionar caixas vazias de outros colecionadores",
                "Criar histórias de origem para manchas aleatórias",
                "Escrever cartas de amor para personagens de tutoriais",
                "Montar dioramas em potinhos de tempero",
                "Praticar telepatia com vegetais",
                "Fazer covers de openings de anime usando só sons de teclado",
                "Competir em corridas imaginárias contra desconhecidos",
                "Planejar fugas elaboradas de situações normais",
                "Escrever biografias fictícias para NPCs",
                "Traduzir músicas para linguagem de sinais dos gatos",
                "Fazer speedrun de atividades cotidianas",
                "Meditar em posições de personagens de videogame",
                "Criar histórias de terror sobre objetos fofos",
                "Interpretar o clima como se fosse uma batalha épica de anime",
                "Colecionar momentos de lag na vida real",
                "Organizar o guarda-roupa por ordem cronológica de animes",
                "Transformar contas de luz em pergaminhos mágicos",
                "Fotografar sombras que parecem personagens de RPG",
                "Criar tier lists de texturas de paredes que já tocou",
                "Fazer unboxing de itens de supermercado como se fossem raros",
                "Narrar a vida de estranhos em estilo documentário de natureza",
                "Compor músicas para plantas em crescimento",
                "Manter um diário das aventuras de seus chinelos",
                "Colecionar pedaços de conversas aleatórias",
                "Desenhar mapas de dungeons em guardanapos de lanchonete",
                "Treinar para batalhas de polegar que nunca acontecem",
                "Fazer cosplay de personagens não-jogáveis de videogames",
                "Desvendar o mistério de onde vão as meias perdidas na lavanderia",
                "Cronometrar o tempo que leva para cada pessoa responder mensagens",
                "Classificar sons de teclado por satisfação auditiva",
                "Criar uma árvore genealógica de todos os mascotes de cereal",
                "Organizar uma parada anual de pelúcias desalinhadas",
                "Transformar erros de digitação em novas palavras com significados",
                "Tirar selfies com sombras que parecem ter formas interessantes"
            ];

            const poderes = [
                "Pode transformar qualquer conversa em uma discussão sobre pão",
                "Capaz de se comunicar com dispositivos eletrônicos quebrados",
                "Tem a habilidade de encontrar meias perdidas, mas apenas as dos outros",
                "Pode prever o futuro, mas só de 5 segundos no futuro e com 50% de precisão",
                "Consegue transformar qualquer frase em uma música de idol desafinada",
                "Pode enxergar o nível de bateria das pessoas",
                "Tem a capacidade de invocar pombos em momentos inconvenientes",
                "Transforma água em suco, mas com sabor errado do que pretendia",
                "Pode traduzir o que plantas pensam, mas elas só pensam em fotossíntese",
                "Capaz de falar com comida, mas só depois que já mordeu",
                "Tem visão de raio-X, mas só funciona com caixas de papelão vazias",
                "Pode teleportar, mas apenas 5cm de cada vez",
                "Controla o clima, mas apenas numa área de 10cm ao redor de seu dedo indicador",
                "Consegue fazer qualquer pessoa espirrar através de telepatia",
                "Pode se transformar em uma versão 2D de si mesma por 3 segundos",
                "Tem o poder de fazer pequenos objetos girarem muito devagar",
                "Capaz de materializar figurinhas aleatórias de álbuns incompletos",
                "Pode ver o passado de objetos, mas só de colheres",
                "Consegue mudar a cor dos semáforos, mas só quando já está perto demais para atravessar",
                "Tem o poder de fazer as pessoas esquecerem brevemente o que iam dizer",
                "Pode transformar qualquer roupa em cosplay, mas só de personagens obscuros",
                "Tem super-força, mas apenas para abrir potes de pepino",
                "Pode teletransportar objetos, mas eles sempre reaparecem com glitter",
                "Consegue falar com versões alternativas de si mesma, todas igualmente confusas",
                "Tem a habilidade de fazer plantas crescerem instantaneamente, mas apenas em formato de emoji",
                "Pode tornar qualquer comida mais fofa em aparência, mas menos saborosa",
                "Capaz de entender idiomas estrangeiros, mas só enquanto está de ponta-cabeça",
                "Tem o poder de fazer com que eletrônicos funcionem sem bateria, mas apenas por 5 segundos",
                "Consegue materializar pequenos objetos, mas sempre são chaveiros de animes antigos",
                "Pode congelar o tempo por 3 segundos, mas fica com soluço após usar esse poder",
                "Tem a habilidade de falar com gatos, mas eles sempre mentem para ela",
                "Capaz de ver fantasmas, mas eles sempre estão no meio de situações embaraçosas",
                "Pode transformar líquidos em gelatina, mas apenas quando está nervosa",
                "Tem o dom de fazer qualquer planta crescer 10x mais rápido, mas ela sempre cresce torta",
                "Consegue fazer pequenos objetos levitarem brevemente se cantarolar o tema de algum anime",
                "Pode transformar-se parcialmente em um animal, mas sempre é uma fusão estranha",
                "Capaz de criar bolhas de sabão que mostram memes aleatórios",
                "Tem o poder de mudar a cor de qualquer objeto, mas a cor muda de novo após 10 minutos",
                "Consegue sentir o sabor da comida apenas olhando para ela, mas sempre sente gosto de wasabi",
                "Pode controlar aparelhos eletrônicos com a mente, mas eles sempre executam a função errada",
                "Capaz de entender a linguagem das plantas, mas elas são extremamente dramáticas",
                "Tem o poder de apagar memórias recentes, mas esquece que usou esse poder",
                "Consegue duplicar pequenos objetos, mas as cópias sempre têm olhos minúsculos",
                "Pode converter pensamentos negativos em confetes, mas eles caem apenas na cabeça dela",
                "Capaz de aumentar ou diminuir livremente o volume da própria voz como um controle remoto",
                "Pode criar miniaturas vivas de si mesma que fazem o oposto do que ela manda"
            ];

            const caracteristicas = [
                "Cabelo que muda de cor conforme seu nível de fome",
                "Olhos que brilham quando detectam mentiras sobre anime",
                "Orelhas que se transformam em antenas de sinal de Wi-Fi",
                "Unhas que crescem em formato de estrelas",
                "Cheiro natural de biscoitos recém-assados",
                "Lágrimas que se transformam em pequenos emoticons",
                "Cria pequenos hologramas quando espirra",
                "Sombra que ocasionalmente faz poses de anime",
                "Mãos que deixam rastros de glitter no ar por 3 segundos",
                "Consegue fazer suas bochechas brilharem no escuro",
                "Cabelo que ignora a gravidade quando está animada",
                "Pode estender seu pescoço como uma girafa em momentos de surpresa",
                "Tem uma marca de nascença que parece o mapa de um dungeon",
                "Pele que muda de textura conforme seu estado emocional",
                "Pode transformar suas orelhas em formato de orelhas de gato",
                "Tem um ahoge (mecha de cabelo) que se move conforme seu humor",
                "O estômago faz som de notificação de celular quando está com fome",
                "Flores minúsculas crescem temporariamente no cabelo quando está feliz",
                "Os olhos mudam para emoticons quando expressa emoções fortes",
                "Pode esticar os dedos como borracha, mas só quando segura doces",
                "Tem um arco-íris miniatura que aparece acima da cabeça quando mente",
                "O cabelo flutua como se estivesse debaixo d'água quando está concentrada",
                "Coração visível através da pele quando está apaixonada (como um desenho)",
                "A roupa muda sutilmente de estilo conforme a música que está tocando ao redor",
                "Deixa pegadas de pixel art temporárias ao andar descalça",
                "Pupilas que se transformam em formas diferentes baseadas em seu interesse atual",
                "Tem cabelo que brilha no escuro como se tivesse luzes de festa",
                "Seus olhos mostram a previsão do tempo de amanhã como um widget",
                "Pele que ocasionalmente se torna transparente revelando um circuito eletrônico",
                "O nariz solta bolhas de sabão coloridas quando está surpresa",
                "Seus dedos podem se transformar em canetas de diferentes cores",
                "Tem uma aura visível que muda de cor conforme seu histórico de navegação",
                "Quando dorme, pequenas nuvens com emoticons flutuam sobre sua cabeça",
                "Um acessório na cabeça que se transforma em itens aleatórios de jogos",
                "Seu cabelo reage e se move conforme o ritmo de qualquer música ao redor",
                "Tem unhas que mostram a última notificação recebida em seu celular",
                "Os dentes ocasionalmente cintilam como em comerciais de pasta de dente",
                "Pequenas estrelas cadentes aparecem ao redor quando ela pisca os olhos rapidamente",
                "Tem uma tatuagem que muda para mostrar o que está pensando no momento",
                "Seu rosto ocasionalmente glitcha como se fosse um personagem de jogo bugado",
                "Tem um chapéu imaginário que apenas crianças e animais conseguem ver",
                "Suas roupas mudam de cor quando ela diz uma mentira",
                "Tem olhos que projetam legendas para o que ela realmente está pensando",
                "Seu cabelo ganha vida própria e reage a estímulos externos como uma planta sensitiva",
                "Quando boceja, pequenas letras do alfabeto japonês saem de sua boca",
                "Seu reflexo em espelhos está sempre usando um cosplay diferente"
            ];

            const frases = [
                "Não é como se eu quisesse salvar o mundo ou algo assim... Baka!",
                "Meu poder é 1% inspiração e 99% confusão aleatória!",
                "Se a vida te der limões, provavelmente sou eu testando meus poderes de invocação!",
                "Posso não ser a heroína que você quer, mas sou a waifu que o algoritmo escolheu!",
                "Meu nível de fofura é superior a 9000... eu acho!",
                "A única coisa mais caótica que meus poderes é minha agenda!",
                "Estava procurando por mim? É uma pena, eu também estou me procurando!",
                "Protagonista do meu próprio anime mental desde 2025!",
                "Não sou estranha, sou uma característica não documentada do universo!",
                "Se você acha que sou confusa, deveria conhecer meus criadores!",
                "Não tenho defeitos, são easter eggs da minha personalidade!",
                "Nada é impossível quando você tem o poder da lógica aleatória e o roteirista ao seu lado!",
                "Faço até o impossível parecer estranhamente específico!",
                "Sou uma entidade caótica neutro com tendência ao drama e às batatas fritas!",
                "Minha existência é 20% canon, 80% fanfic e 100% confusão matemática!",
                "Classificada como fenômeno paranormal-moe em sete dimensões diferentes!",
                "Minha biografia seria censurada por excesso de aleatoriedade!",
                "Sou normal em pelo menos três realidades alternativas... talvez!",
                "Transformo o comum em peculiar e o peculiar em meu café da manhã!",
                "Minha vida é um isekai onde fui transportada para um mundo ainda mais estranho!",
                "Dizem que sou única, mas tenho certeza que há pelo menos 3 bugs idênticos a mim!",
                "Ninguém perguntou por uma waifu assim, mas aqui estou eu, ultrapassando expectativas!",
                "Não me subestime só porque 90% das minhas habilidades são inúteis!",
                "Em um universo infinito, era inevitável que eu acontecesse!",
                "Quanto mais você me conhece, menos sentido eu faço... e isso é proposital!",
                "A física chora um pouquinho toda vez que eu uso meus poderes!",
                "Minha personalidade não é complexa, é uma DLC que ainda não foi lançada!",
                "Processando informação... erro... personagem muito fofa para computação normal!",
                "Não me compare com outras waifus, meu caos é da edição limitada!",
                "Se você está confuso, é porque ainda não atualizou para minha versão mais recente!",
                "Meu poder especial? Transformar situações normais em momentos de anime!",
                "Eu nem existo, mas ainda assim sou mais interessante que muita gente por aí!",
                "Proibida em 47 universos por excesso de aleatoriedade e fofura!",
                "Sou o resultado de um desenvolvedor que tomou muito café e assistiu anime demais!",
                "Não tenho um arco de redenção porque já nasci perfeita... perfeitamente caótica!",
                "Estou sempre no lugar certo na hora errada com a expressão facial surpreendentemente adequada!",
                "Vem com a gente para mais uma aventura sem sentido no mundo da lógica invertida!",
                "Gostaria de dizer que faço sentido em algum universo, mas seria mentira!",
                "Não preciso de fãs, preciso de pessoas que entendam meus jokes de anime obscuros!",
                "Parece que você encontrou um personagem raro! Chance de spawn: 0,01%!",
                "Se eu fosse um bug em um jogo, os desenvolvedores me transformariam em feature!",
                "Segundo meu horóscopo, hoje é um bom dia para confundir completos estranhos!",
                "Minhas habilidades deveriam vir com um manual... que eu perdi no dia um!",
                "As regras da física são mais como... sugestões amigáveis para mim!",
                "Sou considerada um fenômeno inexplicável em pelo menos 5 disciplinas científicas!",
                "Minha lógica é perfeitamente compreensível... se você estiver de cabeça para baixo!",
                "Não é questão de se eu vou fazer algo estranho, é questão de quando!"
            ];

            const nome = nomes[Math.floor(Math.random() * nomes.length)];
            const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
            const personalidade = personalidades[Math.floor(Math.random() * personalidades.length)];
            const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
            const poder = poderes[Math.floor(Math.random() * poderes.length)];
            const caracteristica = caracteristicas[Math.floor(Math.random() * caracteristicas.length)];
            const frase = frases[Math.floor(Math.random() * frases.length)];

            const response = await fetch('https://api.waifu.pics/sfw/waifu');
            const data = await response.json();
            const imageUrl = data.url;

            const embed = new EmbedBuilder()
                .setColor(0xFF93F5)
                .setTitle(`💕 ${nome} ${sobrenome}`)
                .setDescription(`*"${frase}"*`)
                .addFields(
                    {
                        name: '\u200B',
                        value: ''
                    },
                    { name: '✨ Personalidade', value: personalidade, inline: false },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    { name: '🎯 Hobby', value: hobby, inline: false },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    { name: '💫 Poder Especial', value: poder, inline: false },
                    {
                        name: '\u200B',
                        value: ''
                    },
                    { name: '👀 Característica Única', value: caracteristica, inline: false }
                )
                .setImage(imageUrl)

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro ao gerar waifu:', error);
            await interaction.editReply({
                content: '❌ Ocorreu um erro ao gerar sua waifu. Parece que o gerador de waifus está com problemas!',
                ephemeral: true
            });
        }
    },
};
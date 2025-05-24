const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shipp')
        .setDescription('💘 Calcula a compatibilidade entre dois usuários')
        .addUserOption(option =>
            option.setName('usuario1')
                .setDescription('Primeiro usuário do casal')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('usuario2')
                .setDescription('Segundo usuário do casal')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const usuario1 = interaction.options.getUser('usuario1');
            const usuario2 = interaction.options.getUser('usuario2');

            if (usuario1.id === usuario2.id) {
                return await interaction.editReply('❌ Você não pode shippar alguém com si mesmo! Tente com outra pessoa.');
            }

            const seed = (usuario1.id.substring(0, 4) + usuario2.id.substring(0, 4));
            const compatibilidade = ((parseInt(seed, 16) % 100) + 1);

            const nome1 = usuario1.username.substring(0, Math.floor(usuario1.username.length / 2));
            const nome2 = usuario2.username.substring(Math.floor(usuario2.username.length / 2));
            const nomeShip = nome1 + nome2;
            let mensagem, emoji;
            
            if (compatibilidade < 20) {
                mensagem = `Hmm... ${usuario1} e ${usuario2} são como água e óleo. Talvez em outra vida!`;
                emoji = "💔";
            } else if (compatibilidade < 40) {
                mensagem = `${usuario1} e ${usuario2} têm uma chance, mas vão precisar de muito esforço nesse relacionamento!`;
                emoji = "⚡";
            } else if (compatibilidade < 60) {
                mensagem = `${usuario1} e ${usuario2} podem ser bons amigos, quem sabe algo mais no futuro?`;
                emoji = "🌱";
            } else if (compatibilidade < 80) {
                mensagem = `Uau! ${usuario1} e ${usuario2} têm grande potencial para um romance incrível!`;
                emoji = "✨";
            } else if (compatibilidade < 95) {
                mensagem = `${usuario1} e ${usuario2} são praticamente almas gêmeas! Quando é o casamento?`;
                emoji = "💞";
            } else {
                mensagem = `${usuario1} e ${usuario2} foram feitos um para o outro! Um amor escrito nas estrelas!`;
                emoji = "💖";
            }
            const opcoesRomanticas = ['kiss', 'hug', 'cuddle', 'pat'];
            const endpointAleatorio = opcoesRomanticas[Math.floor(Math.random() * opcoesRomanticas.length)];
            
            const useNekos = Math.random() > 0.5;
            
            let response, data, imageUrl;
            
            if (useNekos) {
                response = await fetch(`https://nekos.life/api/v2/img/${endpointAleatorio}`);
                data = await response.json();
                imageUrl = data.url;
            } else {
                response = await fetch(`https://api.waifu.pics/sfw/${endpointAleatorio}`);
                data = await response.json();
                imageUrl = data.url;
            }
            
            if (!imageUrl) {
                imageUrl = 'https://i.imgur.com/XnLrlK2.gif';
            }

            const coresRomanticas = [
                0xFF69B4, // Rosa hot
                0xFF1493, // Rosa profundo
                0xDB7093, // PaleVioletRed
                0xE91E63, // Rosa material
                0xF06292, // Rosa claro material
                0xFF0000, // Vermelho
                0xE53935, // Vermelho material
                0xFF5252  // Vermelho claro material
            ];

            const corAleatoria = coresRomanticas[Math.floor(Math.random() * coresRomanticas.length)];

            const embed = new EmbedBuilder()
                .setColor(corAleatoria)
                .setTitle(`${emoji} Ship: ${nomeShip} ${emoji}`)
                .setDescription(`**Compatibilidade: ${compatibilidade}%**\n\n${mensagem}`)
                .setImage(imageUrl)

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erro no comando de shipp:', error);
            await interaction.editReply('❌ Houve um erro ao calcular o shipp! O cupido está de folga hoje.');
        }
    },
};

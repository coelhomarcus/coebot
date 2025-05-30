# CoeBot - Bot do Discord

CoeBot é um bot de Discord multifuncional com diversos comandos de entretenimento, informações e utilidades.

## Recursos

O CoeBot oferece uma variedade de comandos divertidos e úteis:

### Informações
- `/ajuda` - Exibe todos os comandos do bot
- `/info-usuario` - Exibe informações detalhadas sobre um usuário
- `/info-server` - Exibe informações sobre o servidor atual
- `/avatar` - Mostra o avatar em tamanho grande
- `/curiosidade` - Mostra um fato inútil aleatório traduzido para português
- `/conselho` - Receba um conselho sábio traduzido para português
- Entre outros...

### Entretenimento
- `/jogo-aleatorio` - Recebe uma recomendação de jogo aleatório
- `/waifu` - Gera aleatoriamente uma waifu com imagem e características criativas
- `/randanime` - Envia uma imagem aleatória de anime
- `/otakometro` - Mede o nível de otaku de um usuário
- `/ler-mente` - Simula a leitura de pensamentos de um usuário
- `/beijar` - Beija alguém do servidor com animação
- `/atacar` - Ataca alguém do servidor com animação
- Entre outros...

## Configuração

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Crie um arquivo `config.json` baseado no `config-template.json`
4. Adicione seu token e ID do cliente Discord no arquivo `config.json`
5. Execute `npm start` para registrar os comandos e iniciar o bot

## Requisitos

- Node.js 16.6.0 ou superior
- Uma conta de desenvolvedor no Discord com um aplicativo bot configurado

## Estrutura do Projeto

```
├── commands/            # Todos os comandos slash do bot
│   ├── *.js             # Comandos .js
├── rules/               # Documentação legal
├── config-template.json # Modelo para configuração
├── config.json          # Arquivo de configuração (precisa ser criado)
├── deploy-commands.js   # Script para registrar comandos slash
├── index.js             # Arquivo principal do bot
├── package.json         # Dependências do projeto
└── README.md            # Este arquivo
```

## Configuração detalhada

### Arquivo config.json

Para configurar o bot, crie um arquivo `config.json` com a seguinte estrutura:

```json
{
  "token": "seu-token-do-discord-aqui",
  "clientId": "id-do-seu-aplicativo-aqui"
}
```

### Registrando os comandos

Os comandos slash são registrados automaticamente ao iniciar o bot com `npm start`, que executa primeiro o script `deploy-commands.js` antes de iniciar o bot.

## Tecnologias utilizadas

- Discord.js v14
- Node.js
- node-fetch (para requisições HTTP)

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/coebot.git

# Entrar na pasta do projeto
cd coebot

# Instalar dependências
npm install

# Configurar o arquivo config.json
# (copie config-template.json e adicione seu token e clientId)

# Executar o bot
npm start
```

## Documentação legal

- [Termos de Serviço](rules/termos-de-servico.md)
- [Política de Privacidade](rules/politica-de-privacidade.md)

## Licença

ISC
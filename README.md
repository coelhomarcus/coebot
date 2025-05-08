# CoeBot - Bot do Discord

CoeBot é um bot de Discord multifuncional com diversos comandos de entretenimento, informações e utilidades.

## Recursos

O CoeBot oferece uma variedade de comandos divertidos e úteis:

### Informações
- `/info-usuario` - Exibe informações detalhadas sobre um usuário
- `/info-server` - Exibe informações sobre o servidor atual
- `/github` - Busca informações sobre um repositório do GitHub
- `/avatar` - Mostra o avatar em tamanho grande
- `/marcus` - Mostra os sites do Marcus Coelho

### Entretenimento
- `/waifu` - Gera aleatoriamente uma waifu com uma imagem e descrição criativa
- `/randanime` - Envia uma imagem aleatória de anime (SFW ou NSFW)
- `/otakometro` - Mede o nível de otaku de um usuário com descrições hilárias
- `/ler-mente` - Finge ler os pensamentos de um usuário
- `/beijar` - Beije alguém do servidor
- `/atacar` - Ataque alguém do servidor
- `/hoje-na-historia` - Mostra um fato histórico que aconteceu neste dia

## Configuração

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Renomeie o arquivo `config-template.json` para `config.json`
4. Adicione seu token e ID do cliente Discord no arquivo `config.json`
5. Execute `npm start` para registrar os comandos e iniciar o bot

## Requisitos

- Node.js 16.6.0 ou superior
- Uma conta de desenvolvedor no Discord e um aplicativo bot configurado

## Arquivos importantes

- `index.js` - Arquivo principal do bot
- `deploy-commands.js` - Registra os comandos slash
- `commands/` - Pasta contendo todos os comandos do bot
- `config.json` - Arquivo de configuração (deve ser criado)

## Documentação legal

- [Termos de Serviço](rules/termos-de-servico.md)
- [Política de Privacidade](rules/politica-de-privacidade.md)

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
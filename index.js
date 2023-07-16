const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const client = new Client({
intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
      ]
});

const PORT = 80; // Porta para o servidor HTTP

// Endpoint para obter um meme aleatório
/*app.get('/memes', (req, res) => {
  const meme = {
    title: 'Exemplo de Meme',
    image: 'https://example.com/meme.jpg',
  };

  res.json(meme);
});*/

// Senhas válidas
const senhasValidas = ['senha1', 'senha2', 'senha3'];

// Middleware para analisar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para a sua API de memes
app.get('/memes', (req, res) => {
  console.log("Requisição feita.")
  // Verifique se a senha é válida antes de fornecer acesso aos memes
  const { password } = req.query;

  if (senhasValidas.includes(password)) {
    // Senha correta, retorne os memes
    const memes = [
      { id: 1, title: 'pov: me acho linda', imageURL: "https://media.discordapp.net/attachments/1129952710842662982/1129952804904120379/canva-quando-me-olho-no-espelho---meme-zZuz94COFsI.jpg" },
      { id: 2, title: 'entrei em depressão😭', imageURL: "https://media.discordapp.net/attachments/1129952710842662982/1129953089194049536/a4016f55-b8a8-4df6-9045-431541a399b2.jpg" },
      { id: 3, title: 'Juliana segue chorando.', imageURL: "https://media.discordapp.net/attachments/1129952710842662982/1129953186329931836/As_10_Conversas_mais_bobas_e_ENGRACADAS_do_whatsapp.jpg" }
    ];
    const randomIndex = Math.floor(Math.random() * memes.length);
  const randomMeme = memes[randomIndex];

  // Retorna o meme selecionado
  res.json(randomMeme);
  } else {
    // Senha incorreta, retorne um erro
    res.status(401).json({ error: 'Acesso não autorizado.' });
  }
});


// Inicia o servidor HTTP
/*app.listen(PORT, () => {
  console.log(`API de memes rodando em https://harshexperienceddefragment.celsolopes.repl.co`);
});*/
let PREFIX = '!'; // Prefixo para o comando

// Endpoint para obter um meme aleatório
const getRandomMeme = async () => {
  const response = await fetch('https://harshexperienceddefragment.celsolopes.repl.co/memes?password=senha1');
  const data = await response.json();
  return data;
};

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'meme') {
    try {
      const meme = await getRandomMeme();
      const memeEmbed = new EmbedBuilder()
        .setTitle(meme.title)
        .setImage(meme.imageURL);

      message.channel.send({ embeds: [memeEmbed] });
    } catch (error) {
      console.error('Erro ao obter o meme:', error);
    }
  }
  if(command === "ping")
  {
    message.channel.send("a")
  }
});

client.login('OTQ2MjI3Nzg3MjUxOTg2NDQy.GNUjpZ.r64eAXeFwcFc6aOCS4ZRxqjQmQfjVos4RZ-O3U');

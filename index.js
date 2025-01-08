require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

// Initialize bot with token from .env
const bot = new Telegraf(process.env.BOT_TOKEN);

// start command
bot.start((ctx) => {
    ctx.reply(`Welcome to the joking bot, ${ctx.from.first_name}! 👋`);
});

// help command 
bot.help((ctx) => {
    ctx.reply('i am her to help! try command /start or /joke');
});

// Joke command 
bot.command('joke', async (ctx) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = `${response.data.setup} - ${response.data.punchline}`;
        ctx.reply(joke);
    } catch (error) {
        ctx.reply('Sorry, I could not fetch a joke right now. 😢');
    }
});

// Echo any text
bot.on('text', (ctx) => {
    ctx.reply(`You Said: ${ctx.message.text}`);
});


// Launch the bot
bot.launch();
console.log("Joking bot is running ...");
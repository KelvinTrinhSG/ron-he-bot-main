require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Access the token from environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error("Error: BOT_TOKEN is not set in environment variables.");
    process.exit(1); // Exit the app if the token is missing
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const app = express();

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Click the button to play the game!', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Play Hello World Game', web_app: { url: 'https://hedgon.github.io/unity-web-test/' } }
                ]
            ]
        }
    });
});

app.listen(3000, () => console.log('Bot is running on port 3000'));

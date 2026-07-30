require("dotenv").config();

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true
});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(
        msg.chat.id,
        "🎰 Казино X",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🎮 Играть",
                            web_app: {
                                url: process.env.WEBAPP_URL
                            }
                        }
                    ]
                ]
            }
        }
    );

});

app.get("/balance", (req, res) => {
    res.json({
        balance: 1000
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});

require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/*
|--------------------------------------------------------------------------
| Telegram Bot
|--------------------------------------------------------------------------
*/

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🎰 Казино X", {
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
    });
});

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "ok",
        server: "casino-server",
        version: "1.0.0"
    });
});

app.get("/api/balance", (req, res) => {
    res.json({
        success: true,
        balance: 1000
    });
});

/*
|--------------------------------------------------------------------------
| Frontend
|--------------------------------------------------------------------------
*/

const distPath = path.resolve(__dirname, "../dist");

app.use(express.static(distPath));

app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
    console.log("");
    console.log("======================================");
    console.log("🚀 Casino Server started");
    console.log("🌐 Port:", PORT);
    console.log("📦 Frontend:", distPath);
    console.log("======================================");
    console.log("");
});

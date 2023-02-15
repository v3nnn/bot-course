const TelegramApi = require('node-telegram-bot-api')
const {gameOption, againOptions} = require('.optons')
const token = '5984907688:AAEJUaf8bg7v6-HTXIOxFW-WOZfMOhGQpps'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'The bot will guess the number 0-9, try to guess)')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber; 
    await bot.sendMessage(chatId, 'Try', gameOption);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Initial greeting'},
        {command: '/info', description: 'Get user information'},
        {command: '/game', description: 'Try tu guess'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendMessage(chatId, `welcome to the club`);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game') {
            return startGame(chatId);
        } 
            return bot.sendMessage(chatId, 'I don`t understand u, try again)');
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again') {
            return startGame(chatId);
        }
        if(data === chats[chatId]) {
            return bot.sendMessage(chatId, `Hooray!U won, number: ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Oh no(, U lose, right number: ${chats[chatId]}`,againOptions)
        }

       
    })

}

start()
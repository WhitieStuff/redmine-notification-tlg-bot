const telegramBot = require('node-telegram-bot-api')
const token = '***'

const bot = new telegramBot(token, {
  polling: true
})

module.exports = bot 
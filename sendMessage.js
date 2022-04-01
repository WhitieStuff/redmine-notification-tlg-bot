const bot = require('./bot')
const whitieID = 241337456

const sendMessage = async (message, id = whitieID, parse_mode = 'Markdown') => {
  
  bot.sendMessage(id, message, {
    parse_mode: parse_mode
  })

}

module.exports = sendMessage
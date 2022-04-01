const bot = require('./bot')
const whitieID = *****

const sendMessage = async (message, id = whitieID, parse_mode = 'Markdown') => {
  
  bot.sendMessage(id, message, {
    parse_mode: parse_mode
  })

}

module.exports = sendMessage
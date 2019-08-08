const moment = require('moment')

const logger = {
  info: log => {
    console.info(`${moment().format('YYYY-MM-DD HH:mm:ss')} [INFO] ${log}`)
  }
}

module.exports = logger
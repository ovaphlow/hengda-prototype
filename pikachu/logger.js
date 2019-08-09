const moment = require('moment')

const logger = {
  info: log => {
    console.info(`${moment().format('YYYY-MM-DD HH:mm:ss')} [INFO] ${log}`)
  },
  error: log => {
    console.error(`${moment().format('YYYY-MM-DD HH:mm:ss')} [ERROR] ${log}`)
  }
}

module.exports = logger
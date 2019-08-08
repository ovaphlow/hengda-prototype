const Koa = require('koa')

const app = new Koa()
const serve = require('koa-static');

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const config = require('./config')
const resolve = require('./service/resolve')
const logger = require('./logger')

app.use(serve(__dirname + '/public'))

io.on('connection', client => {
  logger.info('<socket.io> 客户端连接')

  client.on('event', data => {
    logger.info(data)
  })

  client.on('command', data => {
    let result = resolve.command(data)
    io.emit('command', result)
  })

  client.on('disconnect', () => {
    logger.info('<socket.io> 客户端断开')
  })
})

server.listen(config.app.port, () => {
  logger.info(`服务运行于端口 ${config.app.port}`)
})

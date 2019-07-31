const Koa = require('koa')

const app = new Koa()
const serve = require('koa-static');

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const config = require('./config')

app.use(serve(__dirname + '/public'))

io.on('connection', client => {
  console.info('connected')

  client.on('event', data => {
    console.info(data)
  })

  client.on('disconnect', () => {
    console.info('disconnected')
  })
})

server.listen(config.app.port, () => {
  console.info(`${new Date()} 服务运行于端口 ${config.app.port}`)
})

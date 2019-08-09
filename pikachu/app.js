const Koa = require('koa')

const app = new Koa()
const serve = require('koa-static');

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const config = require('./config')
const resolve = require('./service/resolve')
const logger = require('./logger')

const SerialPort = require('serialport')
const port = new SerialPort(config.app.serialport, {
  baudRate: 115200
})

app.use(serve(__dirname + '/public'))

server.listen(config.app.port, () => {
  logger.info(`<web> 服务运行于端口 ${config.app.port}`)
})

port.on('error', err => {
  logger.error(`<serial> ${err}`)
})

port.on('open', () => {
  logger.info(`<serial> 串口已打开`)
})

let _data = ''
port.on('data', data => {
  if (data.slice(0, 3).toString() === 'PLC') {
    _data = data
  } else {
    _data += data
    if (String.fromCharCode(data[data.length - 1]) === '*') {
      io.emit('command', resolve.command(_data))
    }
  }
})

io.on('connection', socket => {
  logger.info('<socket.io> 客户端连接')

  socket.on('event', data => {
    logger.info(data)
  })

  socket.on('command', data => {
    let result = resolve.command(data)
    io.emit('command', result)
  })

  socket.on('disconnect', () => {
    logger.info('<socket.io> 客户端断开')
  })
})

const serialDataA = 'PLCR:@01WD0010804A2FCB2FCB2FCB0102C9C88120427E26*'
const serialDataB = 'PLCR:@01WD00180000000021202020201F211F1E00FF130000028100BD3200BE32000000FEFFFFFF0000000000000000000000000024*'
const timeout = false
const loop = () => {
  if (timeout) return
  let _t = Math.floor(Math.random() * Math.floor(100))
  if (_t < 40) {
    port.write(serialDataA, err => { if (err) logger.error(`<serial> ${err}`) })
  } else if (_t < 80) {
    port.write(serialDataB, err => { if (err) logger.error(`<serial> ${err}`) })
  }
  setTimeout(loop, 2000)
}
loop()
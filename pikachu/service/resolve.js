const moment = require('moment')

const logger = require('../logger')

const frame_a = data => {
  logger.info(`<socket.io> A帧`)
  let item = {}
  item.frame = 'A'
  item.datime = moment().format('YYYY-MM-DD HH:mm:ss')
  let _t = ''

  _t = parseInt(data[14]).toString(2)
  while (_t.length < 8) _t = `0${_t}`

  if (_t[7] === '1') item.kongtiao = '电热II'
  else if (_t[5] === '1') item.kongtiao = '风机强度显示空白'
  else if (_t[4] === '1') item.kongtiao = '空调自动'
  else if (_t[4] === '0') item.kongtiao = '试验'

  _t = parseInt(data[15]).toString(2)
  while (_t.length < 8) _t = `0${_t}`

  if (_t[4] === '1') item.kongtiao1 = '电热I'
  else if(_t[6] === '1') item.kongtiao1 = '停止'
  if (_t[7] === '0') item.kongtiao1 = '强风半冷'
  else if (_t[7] === '1') item.kongtiao1 = '弱风全暖'

  // _t = data[17].charCodeAt().toString(2)
  // while (_t.length < 8) _t = `0${_t}`
  _t = parseInt(data[17], 16).toString(2)
  while (_t.length < 4) _t = `0${_t}`
  if (_t[1] === '1') item.xianlu = '停止'
  else if (_t[2] === '1') item.xianlu = 'II路'
  else if (_t[3] === '1') item.xianlu = 'I路'

  _t = parseInt(data.slice(18, 20), 16) * 0.58824
  item.dianliu0 = `${_t.toString().slice(0, 4)}A`

  _t = Math.floor(parseInt(data.slice(20, 22), 16) * 2.941)
  item.dianya0 = `${_t}V`

  _t = parseInt(data.slice(22, 24), 16) * 0.58824
  item.dianliu1 = `${_t.toString().slice(0, 4)}A`

  _t = Math.floor(parseInt(data.slice(24, 26), 16) * 2.941)
  item.dianya1 = `${_t}V`

  _t = parseInt(data.slice(26, 28), 16) * 0.58824
  item.dianliu2 = `${_t.toString().slice(0, 4)}A`

  _t = Math.floor(parseInt(data.slice(28, 30), 16) * 2.941)
  item.dianya2 = `${_t}V`

  item.carriage = data.slice(32, 34)

  _t = parseInt(data.slice(34, 36), 16) * 0.58824
  item.dianya110v0 = `${_t.toString().slice(0, 5)}V`

  _t = parseInt(data.slice(36, 38), 16) * 0.58824
  item.dianya110v1 = `${_t.toString().slice(0, 5)}V`

  _t = parseInt(data.slice(40, 42), 16)
  item.wendu = `${_t}℃`

  return item
}

const frame_b = data => {
  logger.info('<socket.io> B帧')
  let item = {}
  item.frame = 'B'
  item.datime = moment().format('YYYY-MM-DD HH:mm:ss')
  let _t = ''

  item.fanghuaqi_a = parseInt(data.slice(14, 16), 16)

  _t = parseInt(data[17]).toString(2)
  while (_t.length < 8) _t = `0${_t}`
  item.fanghuaqi_b = _t.slice(4, 8)

  _t = parseInt(data[19]).toString(2)
  while (_t.length < 8) _t = `0${_t}`
  item.fanghuaqi_c = _t.slice(4, 8)

  _t = parseInt(data[21]).toString(2)
  while (_t.length < 8) _t = `0${_t}`
  item.fanghuaqi_d = _t.slice(4, 8)

  item.wendu1 = parseInt(data.slice(22, 24), 16)
  item.wendu2 = parseInt(data.slice(24, 26), 16)
  item.wendu3 = parseInt(data.slice(26, 28), 16)
  item.wendu4 = parseInt(data.slice(28, 30), 16)
  item.wendu5 = parseInt(data.slice(30, 32), 16)
  item.wendu6 = parseInt(data.slice(32, 34), 16)
  item.wendu7 = parseInt(data.slice(34, 36), 16)
  item.wendu8 = parseInt(data.slice(36, 38), 16)
  item.wendu0 = parseInt(data.slice(38, 40), 16)

  _t = parseInt(data[42], 16).toString(2)
  while (_t.length < 4) _t = `0${_t}`
  item.valid_a = _t

  _t = parseInt(data[43], 16).toString(2)
  while (_t.length < 4) _t = `0${_t}`
  item.valid_b = _t

  _t = parseInt(data[44], 16).toString(2)
  while (_t.length < 4) _t = `0${_t}`
  item.chemen1 = _t

  _t = parseInt(data[45], 16).toString(2)
  while (_t.length < 4) _t = `0${_t}`
  item.chemen2 = _t

  item.dianliu_a = parseInt(data.slice(50, 52), 16)

  item.dianliu_b = data.slice(52, 54)

  item.dianya_i = parseInt(data.slice(56, 58), 16) * 2

  item.pinlv_i = parseInt(data.slice(58, 60), 16)

  item.dianya_ii = parseInt(data.slice(62, 64), 16) * 2

  item.pinlv_ii = parseInt(data.slice(64, 66), 16)

  item.yanhuo_a = parseInt(data[74], 16).toString(2)
  item.yanhuo_b = parseInt(data[75], 16).toString(2)
  item.yanhuo_c = parseInt(data[76], 16).toString(2)
  item.yanhuo_d = parseInt(data[77], 16).toString(2)
  item.yanhuo_e = parseInt(data[78], 16).toString(2)
  item.yanhuo_f = parseInt(data[79], 16).toString(2)

  return item
}

const resolve = {
  command: data => {
    logger.info(`<socket.io> 解析 ${data}`)
    let _t = data.slice(0, 5)
    if (_t !== 'PLCR:' && _t !== 'PLCS:') return { message: '数据格式错误(0)' }
    if (data.slice(5, 8) !== '@01') return { message: '数据格式错误(5)'}
    _t = data.slice(8, 10)
    if (_t !== 'WD' && _t !== 'RD') return { message: '数据格式错误(8)'}
    _t = data.slice(10, 14)
    if (_t === '0010') {
      let result = frame_a(data)
      return result
    } else if (_t === '0018') {
      let result = frame_b(data)
      return result
    }
  }
}

module.exports = resolve
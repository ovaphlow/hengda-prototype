const frame_a = data => {
  console.info('A帧', data)
  let item = {}
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

const resolve = {
  command: data => {
    console.info('解析', data)
    let _t = data.slice(0, 5)
    if (_t !== 'PLCR:' && _t !== 'PLCS:') return { message: '数据格式错误(0)' }
    if (data.slice(5, 8) !== '@01') return { message: '数据格式错误(5)'}
    _t = data.slice(8, 10)
    if (_t !== 'WD' && _t !== 'RD') return { message: '数据格式错误(8)'}
    _t = data.slice(10, 14)
    if (_t === '0010') {
      let result = frame_a(data)
      return result
    }
    
  }
}

module.exports = resolve
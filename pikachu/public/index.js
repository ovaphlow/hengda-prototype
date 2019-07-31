const socket = io()

const Home = () => {
  const [item_a, setItemA] = React.useState({
    kongtiao: '空调',
    xianlu: '供电线路',
    dianliu0: '电流0',
    dianya0: '电压0',
    dianliu1: '电流1',
    dianya1: '电压1',
    dianliu2: '电流2',
    dianya2: '电压2',
    carriage: '车厢号',
    dianya110v0: '110V母线电压',
    dianya110v1: '110v本车电压',
    wendu: '车内温度'
  })

  const handleCommand = () => {
    socket.emit('command', document.getElementById('command').value)
  }

  socket
    .off('command')
    .on('command', data => {
      console.info(data)
      if (data.message) {
        window.alert(data.message)
        return
      }
      setItemA(data)
    })

  return (
    <div className="container">
      <input type="text" list="command_list" id="command"
          className="form-control"
      />
      <datalist id="command_list">
        <option value="PLCR:@01WD0010804A2FCB2FCB2FCB0102C9C88120427E26*" />
      </datalist>

      <p className="text-center mt-2">
        <button type="button" className="btn btn-primary" onClick={handleCommand}>
          <i className="fa fa-fw fa-check"></i>
          发送
        </button>
      </p>

      <div className="card shadow">
        <div className="card-body">
          <ul className="list-inline">
            <li className="list-inline-item">
              空调状态：
                  <mark>{item_a.kongtiao}</mark>
            </li>

            <li className="list-inline-item">
              供电线路：
                  <mark>{item_a.xianlu}</mark>
            </li>

            <li className="list-inline-item">
              供电电流：
                  <mark>{item_a.dianliu0}</mark>
            </li>

            <li className="list-inline-item">
              供电电压：
                  <mark>{item_a.dianya0}</mark>
            </li>

            <li className="list-inline-item">
              供电电流：
                  <mark>{item_a.dianliu1}</mark>
            </li>

            <li className="list-inline-item">
              供电电压：
                  <mark>{item_a.dianya1}</mark>
            </li>

            <li className="list-inline-item">
              供电电流：
                  <mark>{item_a.dianliu2}</mark>
            </li>

            <li className="list-inline-item">
              供电电压：
                  <mark>{item_a.dianya2}</mark>
            </li>

            <li className="list-inline-item">
              车厢号：
                  <mark>{item_a.carriage}</mark>
            </li>

            <li className="list-inline-item">
              110V母线电压：
                  <mark>{item_a.dianya110v0}</mark>
            </li>

            <li className="list-inline-item">
              110V本车电压：
                  <mark>{item_a.dianya110v1}</mark>
            </li>

            <li className="list-inline-item">
              车内温度：
                  <mark>{item_a.wendu}</mark>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Home />,
  document.getElementById('app')
)

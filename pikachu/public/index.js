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
  const [item_b, setItemB] = React.useState({
    chesu: '防滑器车速',
    chuanganqi: '防滑器传感器',
    paifengfa0: '防滑器排风阀',
    paifengfa1: '防滑器排风阀',
    wendu1: '轴1温度',
    wendu2: '轴2温度',
    wendu3: '轴3温度',
    wendu4: '轴4温度',
    wendu5: '轴5温度',
    wendu6: '轴6温度',
    wendu7: '轴7温度',
    wendu8: '轴8温度',
    wendu0: '车外温度',
    valid: '有效数据标志',
    chemen1: '车门1状态',
    chemen2: '车门2状态',
    dianliu0: '充电机总电流',
    dianliu1: '充电电流',
    dianya1: '逆变器I电压',
    pinlv1: '逆变器I频率',
    dianya2: '逆变器II电压',
    pinlv2: '逆变器II频率',
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
        <option value="PLCR:@01WD0010804A2ECB2ECB2ECB0102C9C80120427E2D*" />
        <option value="PLCR:@01WD00180000000021202020201F211F1E00FF130000028100BE3200BE32000000FEFFFFFF0000000000000000000000000025*" />
      </datalist>

      <p className="text-center mt-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={handleCommand}>
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

      <div className="card shadow mt-3">
        <div className="card-body">
          <ul className="list-inline">
            <li className="list-inline-item">

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

const socket = io()

const Home = () => {
  const [item_a, setItemA] = React.useState({
    frame: '',
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
    frame: '',
    chesu: '防滑器车速',
    fanghuaqi_a: '防滑器传感器',
    fanghuaqi_b: '防滑器排风阀',
    fanghuaqi_c: '防滑器排风阀',
    wendu1: '轴1温度',
    wendu2: '轴2温度',
    wendu3: '轴3温度',
    wendu4: '轴4温度',
    wendu5: '轴5温度',
    wendu6: '轴6温度',
    wendu7: '轴7温度',
    wendu8: '轴8温度',
    wendu0: '车外温度',
    valid_a: '有效数据标志',
    valid_b: '有效数据标志',
    chemen1: '车门1状态',
    chemen2: '车门2状态',
    dianliu_a: '充电机总电流',
    dianliu_b: '充电电流',
    dianya_i: '逆变器I电压',
    pinlv_i: '逆变器I频率',
    dianya_ii: '逆变器II电压',
    pinlv_ii: '逆变器II频率',
    yanhuo_a: '烟火传感器',
    yanhuo_b: '烟火传感器',
    yanhuo_c: '烟火传感器',
    yanhuo_d: '烟火传感器',
    yanhuo_e: '烟火传感器',
    yanhuo_f: '烟火传感器',
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
      if (data.frame === 'A') setItemA(data)
      else if (data.frame === 'B') setItemB(data)
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
        <div className="card-header">
          <h4>
            A帧
            <small className="pull-right text-secondary">{item_a.datime}</small>
          </h4>
        </div>

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
        <div className="card-header">
          <h4>
            B帧
            <small className="pull-right text-secondary">{item_b.datime}</small>
          </h4>
        </div>

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

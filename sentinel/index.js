const soap = require('soap');

function getWeather(city) {
  const url = 'http://ws.webxml.com.cn/WebServices/WeatherWS.asmx?wsdl';

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    client.getWeather({ theCityCode: city }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.info(result.getWeatherResult.string);
    });
  });
}

function getGrantKmisInterFaceD() {
  const url = 'http://118.26.65.36:6688/kifsd/service/KmisIfsdInfo?wsdl';

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    client.getGrantKmisInterFaceD(`00554@NTF02022020`, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.info('grantCode:');
      console.info(result);
    });
  });

  // getGrantKmisInterFaceD(String grantParm)
  // grantParm: 单位编码（附录3.2）+"@"+厂商编码（以传真方式向京天威申请/申请表格在附录3.4？）
  // setInsulationInfo
  // String licenseCode
  // List insulationInfo
}

// 运用车间站场干线绝缘测试记录
function setStationTrackTrunkInsulateRecord() {
  const url = 'http://118.26.65.36:6688/kifsd/service/KmisIfsdInfo?wsdl';

  const data = [
    {
      primaryKey: '1', //单号主键值
      stationId: '00430', //客整所编码，接口规范附录3.3
      cycleName: '1', //交路车次
      groupId: '1', //编组
      trainId: '1', //车号
      testDate: '2020-01-01 12:34:56', //测试时间
      testLine: '1', //测试线路
      testType: '1', //测试类型
      testHumidity: '50', //湿度
      uvValue: '0',
      uwValue: '0',
      unValue: '0',
      ugValue: '0',
      vwValue: '0',
      vnValue: '0',
      vgValue: '0',
      wnValue: '0',
      wgValue: '0',
      ngValue: '0',
    },
  ];

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    client.setStationTrackTrunkInsulateRecord(
      { licenseCode: '', testRecord: JSON.stringify(data) },
      (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.info(result);
      },
    );
  });
}

// 运用车间站场宫殿绝缘测试记录
function setStationTrackSupplyInsulateRecord() {
  const url = 'http://118.26.65.36:6688/kifsd/service/KmisIfsdInfo?wsdl';

  const data = [
    {
      primaryKey: '1', //单号主键值
      stationId: '00430', //客整所编码，接口规范附录3.3
      cycleName: '1', //交路车次
      groupId: '1', //编组
      trainId: '1', //车号
      testDate: '2020-01-01 12:34:56', //测试时间
      testType: '1', //测试类型
      plusElectric: '1', //正线电压
      minusElectric: '1', //负线电压
      plusResistance: '1', //正线电阻
      minusResistance: '1', //负线电阻
    },
  ];

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    client.setStationTrackSupplyInsulateRecord(
      { licenseCode: '', testRecord: JSON.stringify(data) },
      (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.info(result);
      },
    );
  });
}

if (require.main === module) {
  // getWeather('哈尔滨');
  // getGrantKmisInterFaceD();
  setStationTrackTrunkInsulateRecord();
  // setStationTrackSupplyInsulateRecord();
}

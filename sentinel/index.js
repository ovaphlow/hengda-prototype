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

    client.getGrantKmisInterFaceD(`00554@1`, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
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

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    client.setStationTrackTrunkInsulateRecord(
      { licenseCode: '', testRecord: '[]' },
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

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    client.setStationTrackSupplyInsulateRecord(
      { licenseCode: '', testRecord: '[]' },
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

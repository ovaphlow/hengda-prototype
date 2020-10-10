const soap = require('soap');

var url = 'http://ws.webxml.com.cn/WebServices/WeatherWS.asmx?wsdl';
// http://118.26.65.36:6688/kifsd/service/KmisIfsdInfo?wsdl
// getGrantKmisInterFaceD(String grantParm)
// grantParm: 单位编码（附录3.2）+"@"+厂商编码（以传真方式向京天威申请/申请表格在附录3.4？）
// setInsulationInfo
// String licenseCode
// List insulationInfo

soap.createClient(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  console.info(client);

  // client.getRegionDataset({}, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(result);
  //   console.log(result.getRegionDatasetResult);
  //   console.log(result.getRegionDatasetResult.schema);
  //   console.log(result.getRegionDatasetResult.diffgram);
  //   console.log(result.getRegionDatasetResult.diffgram.getRegion.Province);
  // });

  // client.getRegionProvince({}, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.info(result.getRegionProvinceResult.string);
  // });

  // client.getSupportCityString({ theRegionCode: "黑龙江" }, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.info(result.getSupportCityStringResult.string);
  // });

  client.getWeather({ theCityCode: '哈尔滨' }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(result.getWeatherResult.string);
  });
});

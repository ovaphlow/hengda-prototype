const soap = require('soap');

var url = 'http://ws.webxml.com.cn/WebServices/WeatherWS.asmx?wsdl';

soap.createClient(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  // client.getRegionDataset({}, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  // console.log(result);
  // console.log(result.getRegionDatasetResult);
  // console.log(result.getRegionDatasetResult.schema);
  // console.log(result.getRegionDatasetResult.diffgram);
  // console.log(result.getRegionDatasetResult.diffgram.getRegion.Province);
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

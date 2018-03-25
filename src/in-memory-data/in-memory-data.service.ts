import { InMemoryDbService } from 'angular-in-memory-web-api';
import {WebService,LoginResponse} from '../common/webservice';
import {MockHappyLoginResponse, MockSadLoginResponse} from './mock-login-response';
import {MockBitcoinPrice} from './mock-bitcoinprice-response';
import {MockBuyResponse} from './mock-buy-response';
import {MockSellResponse} from './mock-sell-response';
import {MockHistoryResponse} from './mock-history-response';
import {MockRegisterResponse} from './mock-register-response';

import { ParsedRequestUrl, RequestInfo, RequestInfoUtilities, ResponseOptions } from '../in-mem/interfaces';
import { getStatusText, STATUS } from '../in-mem/http-status-codes';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [];
    return {heroes};
  }

  get(reqInfo : RequestInfo){
    console.log("get request url: "+reqInfo.url);
    if(reqInfo.req.url.includes(WebService.API_GET_BTCPRICE)){
      console.log("calling "+WebService.API_GET_BTCPRICE);
      return this.getBTCPrice(reqInfo);
    }

    return undefined;
  }

  post(reqInfo: RequestInfo){
    console.log("post request url: ",reqInfo.url);
    if(reqInfo.url == WebService.API_GET_USER){
        console.log("calling "+WebService.API_GET_USER);
        return this.getUser(reqInfo);
    }

    if(reqInfo.url == WebService.API_BUYBTC){
      console.log("calling "+WebService.API_BUYBTC);
      return this.buyBTC(reqInfo);
    }

    if(reqInfo.url == WebService.API_SELLBTC){
      console.log("calling "+WebService.API_SELLBTC);
      return this.sellBTC(reqInfo);
    }

    if(reqInfo.url == WebService.API_HISTORY){
      console.log("calling "+WebService.API_HISTORY);
      return this.getHistory(reqInfo);
    }

    if(reqInfo.url == WebService.API_REGISTER){
      console.log("calling "+WebService.API_REGISTER);
      return this.register(reqInfo);
    }

    return undefined;
  }

  private register(reqInfo: RequestInfo){
    return reqInfo.utils.createResponse$(()=>{
      let options:ResponseOptions = {
        body: MockRegisterResponse,
        status: STATUS.OK,
      }
      return this.finishOptions(options, reqInfo);
    });
  }

  private getHistory(reqInfo : RequestInfo){
    return reqInfo.utils.createResponse$(()=>{
      let options:ResponseOptions = {
        body: MockHistoryResponse,
        status: STATUS.OK,
      }
      return this.finishOptions(options, reqInfo);
    });
  }

  private sellBTC(reqInfo: RequestInfo){
    return reqInfo.utils.createResponse$(()=>{

      let options:ResponseOptions = {
        body: MockSellResponse,
        status: STATUS.OK,
      }
      return this.finishOptions(options, reqInfo);
    });
  }

  private buyBTC(reqInfo: RequestInfo){
    return reqInfo.utils.createResponse$(()=>{

      let options: ResponseOptions = {
        body: MockBuyResponse,
        status: STATUS.OK,
      }
      return this.finishOptions(options, reqInfo);
    });
  }

  private getBTCPrice(reqInfo: RequestInfo){
    return reqInfo.utils.createResponse$(()=>{
      let options:ResponseOptions = {
        body:MockBitcoinPrice,
        status:STATUS.OK,
      }
      return this.finishOptions(options,reqInfo);
    });
  }

  private getUser(reqInfo : RequestInfo){
    return reqInfo.utils.createResponse$(() =>{

      let param = reqInfo.req.body.split("&")
      console.log(param);

      let options: ResponseOptions;

      if(param[0] == 'uname=test' && param[1]== "upassword=test"){
        options = {
          body: MockHappyLoginResponse,
          status: STATUS.OK
        };
        console.log("login successful");
      }else{
        options = {
            error: MockSadLoginResponse,
            status: STATUS.BAD_REQUEST
        };
        console.log("login failed");
      }

      console.log(options);
      return this.finishOptions(options,reqInfo);
    });
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}

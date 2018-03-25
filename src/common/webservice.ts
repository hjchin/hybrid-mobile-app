import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse,HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

export interface BitcoinPrice{
    status:any,
    status_message: string,
    bitcoinprice: string
}

export interface LoginResponse {
    status: any;
    status_message: string;
    fname: string;
    lname: string;
    uname: string;
    rm: string;
    btc: string;
    publickey: string;
}

export interface BuyResponse {
    status: any;
    status_message: string;
    rm : string;
    btc: string;
    bitcoinprice: string;
}

export interface SellResponse {
    status: any;
    status_message: string;
    rm : string;
    btc: string;
    bitcoinprice: string;
}

export interface HistoryResponse {
    status: any;
    status_message: string;
    data: Item[];
}
  
export interface Item{
    data : Record;
}

export interface Record{
    date_time: string;
    type: string;
    before_btc: string;
    after_btc: string;
    before_rm: string;
    after_rm:string;
    btc_price: string;
}

export interface RegisterResponse {
    status: any;
    status_message: string;
    data : string;
}

@Injectable()
export class WebService{

    /*
    IMPORTANT: NO tailing slash 
    */
    public static API_BASE = "http://www.abchost.com";

    public static API_GET_USER = WebService.API_BASE + "/api/login.php";
    public static API_GET_BTCPRICE = WebService.API_BASE + "/api/price.php";
    public static API_BUYBTC = WebService.API_BASE + "/api/buy.php";
    public static API_SELLBTC = WebService.API_BASE + "/api/sell.php";
    public static API_HISTORY = WebService.API_BASE + "/api/history.php";
    public static API_REGISTER = WebService.API_BASE + "/api/register.php";

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'})
    };

    constructor(private http: HttpClient){}

    getBTCPrice(username:string){
        return this.http
            .get<BitcoinPrice>(WebService.API_GET_BTCPRICE+"?uname="+username)
            .pipe(retry(3));
    }

    getUser(uname:string,upassword:string){
        let params = "uname="+uname+"&upassword="+upassword;
        return this.http
            .post<LoginResponse>(WebService.API_GET_USER,params,this.httpOptions)
            .pipe(retry(3));
    }

    buyBTC(uname:string,upassword:string,amount:string){
        let params = "uname="+uname+"&upassword="+upassword+"&btc2="+amount;
        console.log(params);
        return this.http
            .post<BuyResponse>(WebService.API_BUYBTC,params,this.httpOptions)
            .pipe(retry(3));
    }

    sellBTC(uname:string,upassword:string,amount:string){
        let params = "uname="+uname+"&upassword="+upassword+"&btc2="+amount;
        console.log(params);
        return this.http
            .post<SellResponse>(WebService.API_SELLBTC,params,this.httpOptions)
            .pipe(retry(3));
    }

    getHistory(uname:string,upassword:string){
        let params = "uname="+uname+"&upassword="+upassword;
        return this.http
            .post<HistoryResponse>(WebService.API_HISTORY,params, this.httpOptions)
            .pipe(retry(3));
    }

    register(fname:string,
        lname:string,
        uname:string,
        upassword:string,
        email:string){
        
        let params = "fname="+fname+"&lname="+lname+"&uname="+uname+"&upassword="+upassword+"&email="+email;

        return this.http
            .post<RegisterResponse>(WebService.API_REGISTER,params,this.httpOptions)
            .pipe(retry(3));   
    }

}
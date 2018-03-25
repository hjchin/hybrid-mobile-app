import { Component } from '@angular/core';
import { NavController, 
        NavParams, 
        ToastController,
        Loading,
        LoadingController   } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WalletUser } from '../../common/User';
import {WebService} from '../../common/webservice';
import { UIUtil } from '../../common/UIUtit';

@Component({
  selector: 'buy-page',
  templateUrl: 'buy.html'
})

export class BuyPage {
  buy: FormGroup;
  userRM: string;
  userBtc: string;
  btcPrice:number;
  totalCost:number;
  amount:number;
  uiState:string;

  newRM:string;
  newBTC:string;
  btcBoughtPrice:string;
  loading: Loading;
  requestCounter:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    private formBuilder:FormBuilder,
    private loadingCtrl: LoadingController,
    private webservice: WebService
    ) {

    this.userRM = WalletUser.getRM();
    this.userBtc = WalletUser.getBTC();
    this.btcPrice = 0;
    this.totalCost = 0;
    this.amount = 0;
    this.uiState = "showInput"
    this.requestCounter = 2;
 
    this.loading  = UIUtil.createLoading(this.loadingCtrl);
    this.loading.present();
    this.queryData();

    this.buy = this.formBuilder.group({
      amount:['',[Validators.required, Validators.min(0.0001)]],
    });

  }

  queryData(){
    this.queryUserInfo();
    this.queryBtcPrice();
  }

  queryUserInfo(){
    this.webservice.getUser(WalletUser.getUName(),WalletUser.getPassword()).subscribe(
        data=>{
          console.log("retrieve user success",data);
          WalletUser.setData(data);
          this.userRM = WalletUser.getRM();
          this.dismissLoading();
        },
        error =>{
          UIUtil.createToast(this.toastCtrl,error.error.status_message).present();
          console.log("retrieve user failed",error.error);
        }
    );
  }
    

  queryBtcPrice(){
    this.webservice.getBTCPrice(WalletUser.getUName()).subscribe(
      data=>{
        console.log("retrieve price success",data);
        this.btcPrice = parseFloat(data.bitcoinprice);
        this.dismissLoading();
      },
      error =>{
        UIUtil.createToast(this.toastCtrl,error.error.status_message).present();
        console.log("retrieve failed",error.error);
      }
    );
  }

  dismissLoading(){
    this.requestCounter--;
    if(this.requestCounter == 0){
      this.loading.dismiss();
    }
  }

  onKey(keyCode){
    console.log(this.buy.value);
    console.log("calc", "Amount:"+(this.buy.value.amount).toString());
    console.log("calc", "Price:"+this.btcPrice);
    this.totalCost = parseFloat(this.buy.value.amount) * this.btcPrice;
  }

  next(){
    console.log(this.buy.value);
    this.amount = this.buy.value.amount;
    this.uiState = 'confirmPage';
  }

  confirm(){
    
    this.webservice.buyBTC(WalletUser.getUName(),WalletUser.getPassword(),this.buy.value.amount).subscribe(
        data=>{
          console.log("buy success",data);
          this.newRM = data.rm;
          this.newBTC = data.btc;
          this.btcBoughtPrice = data.bitcoinprice;
          this.uiState = "result"; //show resultTemplate
        },
        error =>{
          UIUtil.createToast(this.toastCtrl,"buy error").present();
          console.log("buy failed",error.error);
        }
      );
  }

  toggleInput(){
    this.queryData();
    this.buy.reset();
    this.uiState = "showInput";
    this.totalCost = 0;
  }

}

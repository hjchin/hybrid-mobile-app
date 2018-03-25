import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Loading,
  LoadingController   } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WalletUser } from '../../common/User';
import { UIUtil } from '../../common/UIUtit';
import {WebService} from '../../common/webservice';

@Component({
  selector: 'sell-page',
  templateUrl: 'sell.html'
})

export class SellPage {
  sell: FormGroup;
  userRM: string;
  userBtc: string;
  btcPrice:number;
  totalSelling:number;
  amount:number;
  uiState:string;

  newRM:string;
  newBTC:string;
  btcSoldPrice:string;
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
    this.userBtc = "0.00";
    this.btcPrice = 0;
    this.totalSelling = 0;
    this.uiState = "showInput"
    this.requestCounter = 2;

    this.loading  = UIUtil.createLoading(this.loadingCtrl);
    this.loading.present();
    this.queryData();
    
    this.sell = this.formBuilder.group({
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
          this.userBtc = WalletUser.getBTC();
          this.dismissLoading();
        },
        error =>{
          UIUtil.createToast(this.toastCtrl,error.error.status_message).present();
          console.log("retrieve user failed",error.error);
        }
      );
  };

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
    console.log(this.sell.value);
    console.log("calc", "Amount:"+(this.sell.value.amount).toString());
    console.log("calc", "Price:"+this.btcPrice);
    this.totalSelling = parseFloat(this.sell.value.amount) * this.btcPrice;
  }

  next(){
    console.log(this.sell.value);
    this.amount = this.sell.value.amount;
    this.uiState = 'confirmPage';
  }

  confirm(){
    this.webservice.sellBTC(WalletUser.getUName(),WalletUser.getPassword(),this.sell.value.amount).subscribe(
      data=>{
        console.log("sell success",data);
        this.newRM = data.rm;
        this.newBTC = data.btc;
        this.btcSoldPrice = data.bitcoinprice;
        this.uiState = "result";

      },
      error =>{
        UIUtil.createToast(this.toastCtrl,"sell error").present();
        console.log("sell failed",error.error);
      }
    );
  }

  toggleInput(){
    this.queryData();
    this.sell.reset();
    this.uiState = "showInput";
    this.totalSelling = 0;
  }

 
}

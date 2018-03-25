import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { WalletUser } from '../../common/User';
import { WebService} from '../../common/webservice';
import { UIUtil } from '../../common/UIUtit';
import { Environment } from '../../common/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  private btcPrice:string;
  private version:string;

  constructor(public navCtrl: NavController, 
              private toastCtrl:ToastController,
              private service:WebService
            ) {
    this.version = Environment.getVersion();          
    this.queryBtcPrice();  
  }

  queryBtcPrice(){
    this.btcPrice = "retrieving...";
    this.service.getBTCPrice(WalletUser.getUName()).subscribe(
      data=>{
        console.log("retrieve price success",data);
        if(data.status == 200 && data.status_message == 'GET PRICE SUCCESS'){
          this.btcPrice = "RM"+data.bitcoinprice;
          return;
        }

      },
      error =>{
        UIUtil.createToast(this.toastCtrl,error.error.status_message).present();
        console.log("retrieve failed",error.error);
      }
    );
  }



}

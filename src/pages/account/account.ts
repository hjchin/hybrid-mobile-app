import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { WalletUser } from '../../common/User';
import { UIUtil } from '../../common/UIUtit';
import { WebService } from '../../common/webservice';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {

  private userRM:string;
  private userBTC:string;

  constructor(public navCtrl: NavController, 
              private toastCtrl:ToastController,
              private webservice:WebService) {
    this.userRM = WalletUser.getRM();
    this.userBTC = WalletUser.getBTC();
    this.queryUserInfo();
  }

  queryVerification(){
    //profile.php
  }

  queryUserInfo(){
    this.webservice.getUser(WalletUser.getUName(),WalletUser.getPassword()).subscribe(
      data=>{
        console.log("retrieve user success",data);
        WalletUser.setData(data);
        this.userRM = WalletUser.getRM();
        this.userBTC = WalletUser.getBTC();
      },
      error =>{
        UIUtil.createToast(this.toastCtrl,error.error.status_message).present();
        console.log("retrieve user failed",error.error);
      }
    );
  }
}

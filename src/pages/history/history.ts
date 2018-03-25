import { Component } from '@angular/core';
import { NavController, 
        NavParams, 
        ToastController,
        Loading,
        LoadingController  } from 'ionic-angular';
import { WalletUser } from '../../common/User';
import { UIUtil } from '../../common/UIUtit';
import {WebService, Item} from '../../common/webservice';

@Component({
  selector:'history-page',
  templateUrl: 'history.html',
})

export class HistoryPage {
  data: Item[];
  loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private webservice: WebService
    ) {
    this.loading  = UIUtil.createLoading(this.loadingCtrl);
    this.loading.present();
    this.queryHistory();
  }

  queryHistory(){
    
    this.webservice.getHistory(WalletUser.getUName(),WalletUser.getPassword()).subscribe(
      data=>{
        console.log("retrieve history success",data);
        this.data = data.data;
        this.loading.dismiss();
      },
      error =>{
        UIUtil.createToast(this.toastCtrl,error.error.status_message).present();
        console.log("retrieve history failed",error.error);
      }
    );
  }
}
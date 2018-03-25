import { Component } from '@angular/core';
import {NavController, 
        NavParams, 
        ToastController,
        LoadingController,  
        Loading} from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';
import { WalletUser } from '../../common/User';

@Component({
  templateUrl: 'logout.html'
})

export class LogoutPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  loginCredential:{};
  loginForm: FormGroup;
  loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

      WalletUser.removePassword();

      console.log("logout");
      this.navCtrl.setRoot(LoginPage);
      this.navCtrl.popToRoot();
  }

  
}

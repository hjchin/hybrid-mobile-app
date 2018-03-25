import { Component } from '@angular/core';
import {NavController, 
        NavParams, 
        ToastController,
        LoadingController,  
        Loading} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';
import {UIUtil} from '../../common/UIUtit';
import {WalletUser} from '../../common/User';
import {WebService,LoginResponse} from '../../common/webservice';
import { Environment } from '../../common/global';

@Component({
  templateUrl: 'login.html',
  selector: 'login-page'
})

export class LoginPage {
  loginCredential:{};
  loginForm: FormGroup;
  loading: Loading;
  version: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public webservice: WebService) {
      this.version = Environment.getVersion();
      this.loginForm = this.formBuilder.group({
        username:['',[Validators.required, Validators.minLength(1)]],
        password:['',[Validators.required, Validators.minLength(1)]],
      });
      this.loading = UIUtil.createLoading(this.loadingCtrl);
      this.retreiveUser();
  }

  openRegister(){     
    this.navCtrl.push(RegisterPage);
  }

  login(){
    console.log(this.loginForm.value);
    this.postLogin(this.loginForm.value.username,this.loginForm.value.password);
  }

  retreiveUser(){
    let uname = WalletUser.getUName();
    let upassword = WalletUser.getPassword();

    console.log("retreive","name:"+WalletUser.getUName());
    console.log("retreive","password:"+WalletUser.getPassword());

    if(uname != null && upassword != null){
      this.loading.present();
      this.postLogin(uname,upassword);
    }
  }

  postLogin(uname:string,upassword:string){

    this.webservice.getUser(uname,upassword).subscribe(
      data=>{
        this.loading.dismiss();
        console.log("login success",data);
        this.storeUserInfo(data);
        this.redirectToHomePage();
      },
      error =>{
        this.loading.dismiss();
        if(error.error.status_message == 'WRONG PASSWORD LA'){
          UIUtil.createToast(this.toastCtrl,"Wrong login credential").present();
        }else{
          UIUtil.createToast(this.toastCtrl,"Login error").present();
        }
        
        console.log("login failed",error.error);
      }
    );
  }

  redirectToHomePage(){
    this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  storeUserInfo(data:LoginResponse){
    WalletUser.setData(data);
    if( this.loginForm.value.password != "" ){
      WalletUser.setPassword(this.loginForm.value.password);
    }
  }
}

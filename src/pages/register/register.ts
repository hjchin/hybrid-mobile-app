import { Component } from '@angular/core';
import { NavController, NavParams, ToastController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import {WebService} from '../../common/webservice';

export interface RegisterResponse {
  status: any;
  status_message: string;
  data : string;
}

@Component({
  templateUrl: 'register.html'
})

export class RegisterPage {
  register: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    private formBuilder:FormBuilder,
    private alertCtrl: AlertController,
    private webservice :WebService) {

    this.register = this.formBuilder.group({
      email:['',[Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      username:['',[Validators.required, Validators.minLength(3)]],
      fname:['',Validators.required],
      lname:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(6)]],
      cpassword:['',[Validators.required,Validators.minLength(6)]],
    });
  }


  regsiterForm(){
    console.log(this.register.value);
    if(this.register.value.password != this.register.value.cpassword){
      this.createToast("Password mismatch").present();
      return;
    }

    this.webservice.register(
      this.register.value.fname,
      this.register.value.lname,
      this.register.value.username,
      this.register.value.password,
      this.register.value.email
      ).subscribe(
        data=>{
          console.log("login success",data);

          if(data.status == 200 && data.status_message == 'REGISTER SUCCESS, PLEASE VERIFY YOUR EMAIL'){
            this.showSuccessfulMessage();
            return;
          }

          if(data.status == 200 && data.status_message == "REGISTER FAIL"){
            this.createToast("Registration failed").present();
            return;
          }

        },
        error =>{

          if(error.error.status_message == 'USER ALREADY EXISTS'){
            this.createToast("Registration failed. User already exists.").present();
          }else{
            this.createToast("Registration error").present();
          }
          
          console.log("login failed",error.error);
        }
    );
  }

  createToast(message){
    var option = {duration:3000,message:""};
    option.message = message;
    var toast = this.toastCtrl.create(option);
    return toast;
  }

  showSuccessfulMessage(){
    let alert = this.alertCtrl.create({
      title: 'Registration Successful!',
      subTitle: 'Please verify your email to activate your account',
      buttons:[
        {
          text: 'OK',
          handler:()=>{
              this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }
}

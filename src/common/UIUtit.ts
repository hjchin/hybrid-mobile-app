import { ToastController, LoadingController  } from 'ionic-angular';

export class UIUtil{
    
    static createToast(toastCtrl: ToastController, message:string){
        let option = {duration:3000,message:""};
        option.message = message;
        let toast = toastCtrl.create(option);
        return toast;
    }

    static createLoading(loadingCtrl: LoadingController, message?:string){
        let option = {content:"Please wait..."};
        if(message != null){
            option.content = message;
        }
        let loader = loadingCtrl.create(option);
        return loader;
    }

}


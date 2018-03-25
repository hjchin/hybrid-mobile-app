import { LoginResponse } from "../common/webservice";

class User{

    private static instance:  User;
 
    private constructor(){}

    public static getInstance(){
        return this.instance || (this.instance = new this());
    }

    public setUName(name:string){
        window.localStorage.setItem('name',name);
    }

    public getUName(){
        return window.localStorage.getItem('name');
    }

    public setPassword(password:string){
        window.localStorage.setItem('password',password);
    }

    public getPassword(){
        return window.localStorage.getItem('password');
    }

    public removePassword(){
        window.localStorage.removeItem('password');
    }

    public setFname(fname:string){
        window.localStorage.setItem('fname',fname);
    }
    
    public getFname(){
        return window.localStorage.getItem('fname');
    }

    public setLname(fname:string){
        window.localStorage.setItem('lname',fname);
    }
    
    public getLname(){
        return window.localStorage.getItem('lname');
    }

    public setRM(rm:string){
        window.localStorage.setItem('rm',rm);
    }
    
    public getRM():string{
        return window.localStorage.getItem('rm');
    }

    public setBTC(btc:string){
        window.localStorage.setItem('btc',btc);
    }
    
    public getBTC():string{
        return window.localStorage.getItem('btc');
    }

    public setPublicKey(publickey:string){
        window.localStorage.setItem('publickey',publickey);
    }

    public getPublicKey():string{
        return window.localStorage.getItem('publickey');
    }

    public setData(data:LoginResponse){
        this.setUName(data.uname);
        this.setFname(data.fname);
        this.setLname(data.lname);
        this.setRM(data.rm);
        this.setBTC(data.btc);
        this.setPublicKey(data.publickey);
    }
}

export const WalletUser = User.getInstance();
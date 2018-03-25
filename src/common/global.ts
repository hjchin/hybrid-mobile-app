export class Environment{
    public static production:boolean = false; 
    public static versionCode:string = "0.1";

    public static getVersion():string {
        return Environment.production ? "v"+Environment.versionCode : "v"+Environment.versionCode+"d";
    }

}
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({providedIn:'root'})
export class PermissionService {

  constructor(private diagnostic:Diagnostic,private localNotifications:LocalNotifications,
              // private componentsUtilsService:ComponentsUtilsService
              ) { }

  async notificationPermission(){
   return await this.localNotifications.requestPermission()
   .catch(async (e)=>{
    //  await this.componentsUtilsService.presentToast1('Ocurrió un error al solicitar permisos a las notificaciones.')
   });
  }

  async openConfig(){
    return await this.diagnostic.switchToSettings()
  }
}

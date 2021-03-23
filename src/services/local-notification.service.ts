import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { PermissionService } from './permission.service';
import { ComponentsUtilsService } from './components-utils.service';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(private localNot:LocalNotifications,private permissionService:PermissionService,
              private componentsUtilsService:ComponentsUtilsService) { }

  async configNotificationDelay(title:string,text:string,delay:any,idList:any){
    if(await this.permissionService.notificationPermission()){
      this.localNot.schedule({
        id:idList,
        text:text,
        title:title,
        trigger:{at:new Date(delay)}
      });
      await this.componentsUtilsService.presentToast1('Notificación configurada.')
    }
    else{
      await this.componentsUtilsService
      .presentAlertOpenConfig('Necesitas dar los permisos necesarios para poder enviar notificaciones.\n ¿Abrir configuración?.');
    }
  }
}

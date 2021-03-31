import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

declare let NavigationBar:any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private localNotifications:LocalNotifications,
    private router:Router,
    private screenOrientation:ScreenOrientation
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(async () => {
      this.localNotifications.on('click').subscribe((res)=>{
        this.router.navigate(['/','view-detail-list',res['id']])
      })
      if(this.platform.is('cordova')){
        NavigationBar.backgroundColorByName('white',false);
        await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }

    });
  }
}

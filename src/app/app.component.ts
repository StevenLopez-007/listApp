import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private localNotifications:LocalNotifications,
    private router:Router,
    private splashScreen:SplashScreen
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.localNotifications.on('click').subscribe((res)=>{
        this.router.navigate(['/','view-detail-list',res['id']])
      })

      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#040C3A');
        // this.Lottie.hide();
      // this.splashScreen.hide();

    });
  }
}

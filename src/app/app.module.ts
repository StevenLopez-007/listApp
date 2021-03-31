import { NgModule } from '@angular/core';
import { BrowserModule,HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Imports
import {NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsUtilsService } from '../services/components-utils.service';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import { PermissionService } from '../services/permission.service';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { enterAnimation } from '../animations/nav-animation';
import {enterAnimationAlert,leaveAnimationAlert} from '../animations/alertAnimation1'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HammerModule,BrowserAnimationsModule ,IonicModule.forRoot({
    // navAnimation:enterAnimation,
    alertEnter:enterAnimationAlert,
    alertLeave:leaveAnimationAlert
  }),SuperTabsModule.forRoot(), AppRoutingModule,HttpClientModule],
  // exports:[FilterProductsPipe,FilterFoundProductsPipe],
  providers: [
    StatusBar,
    NativePageTransitions,
    Keyboard,
    SQLite,
    SQLitePorter,
    ScreenOrientation,
    ComponentsUtilsService,
    PermissionService,
    LocalNotifications,
    Diagnostic,
    DatePicker,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

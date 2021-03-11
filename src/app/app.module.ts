import { NgModule } from '@angular/core';
import { BrowserModule,HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
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
import { ShowInputDirective } from './directives/show-input.directive';
import { NumberInputDirective } from './directives/number-input.directive';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HammerModule,BrowserAnimationsModule ,IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  // exports:[FilterProductsPipe,FilterFoundProductsPipe],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    Keyboard,
    SQLite,
    SQLitePorter,
    ScreenOrientation,
    ComponentsUtilsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { FilterFoundProductsPipe } from './pipes/filter-found-products.pipe';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx'
@NgModule({
  declarations: [AppComponent, FilterProductsPipe, FilterFoundProductsPipe],
  entryComponents: [],
  imports: [BrowserModule,BrowserAnimationsModule ,IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
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

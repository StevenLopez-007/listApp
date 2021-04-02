import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  @ViewChild('navTabs',{static:false}) navTabs:IonTabs;
  numberTabs:number=3;
  widthTab:number;
  widthTabBar:number;
  dif:number;
  constructor(private keyboard:Keyboard,private screenOrientation:ScreenOrientation,private splashScreen:SplashScreen) {}

  ngOnInit(){
    this.configBar();
    this.screenOrientation.onChange().subscribe(()=>{
      setTimeout(()=>{
        this.configBar();
        this.barAnimation();
      },200)
    })
  }
  
  ionViewDidEnter(){
    this.keyboard.onKeyboardWillShow().subscribe((sus)=>{
      document.getElementById('containerBar').style.visibility="hidden"
    });
    this.keyboard.onKeyboardWillHide().subscribe((sus)=>{
      setTimeout(()=>{
        document.getElementById('containerBar').style.visibility='inherit';
        this.barAnimation();
      },100)
    })
    this.barAnimation();
    setTimeout(()=>{this.splashScreen.hide();},600);
  }

  configBar(){
    this.widthTab = document.querySelector('ion-tab-bar').offsetWidth;
    this.widthTabBar = this.widthTab/this.numberTabs;
    if(this.widthTabBar>168){
      this.dif = ((window.innerWidth-504)/2)-10;
      document.getElementById('barTab').style.width='168px'
      this.widthTabBar=168;
      this.widthTab=504
    }else{
      this.dif =0;
      document.getElementById('barTab').style.width=`${this.widthTabBar-15}px`
    }
  }

  async barAnimation(){
    const tab = await this.navTabs.getSelected();
      switch(tab){
        case 'tab1':
          document.getElementById('barTab').style.transform=`translateX(${10+this.dif}px)`;
          break;
        case 'tab2':
          document.getElementById('barTab').style.transform=`translateX(${this.widthTabBar+10+this.dif}px)`;
          break;
        case 'tab3':
          document.getElementById('barTab').style.transform=`translateX(${(this.widthTab-this.widthTabBar)+10+this.dif}px)`;
          break;
      }
  }

}

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShortCutsService {

  constructor(private platform: Platform,private router:Router) { }

  configAppShortCuts() {
    if (this.platform.is('android') && this.platform.is('cordova')) {
      if (window.localStorage.getItem('shortCutsSupported') == null) {
        this.verifyShortCuts();
      }
      else if(window.localStorage.getItem('shortCutsSupported')=='true' && window.localStorage.getItem('shortCutsApplied')=='false'){
        this.setShortCuts();
      }
      else if(window.localStorage.getItem('shortCutsSupported')=='true' && window.localStorage.getItem('shortCutsApplied')=='true' ){
        this.getIntent();
      }

    }
  }

  private verifyShortCuts() {
    window['plugins'].Shortcuts.supportsDynamic((supported) =>{
      if (supported) {
        console.log('Dynamic shortcuts are supported');
        window.localStorage.setItem('shortCutsSupported', 'true')
        this.setShortCuts();
      } else {
        console.log('Dynamic shortcuts are NOT supported')
        window.localStorage.setItem('shortCutsSupported', 'false')
      }
    })
  }

  private getIntent(){
    window['plugins'].Shortcuts.getIntent((intent)=> {
      console.log(JSON.stringify(intent));
      if(intent['data'] && intent['extras']['com.salg.listapp.fromShortCuts']){
        this.router.navigate([intent['data']],{state:{segment:2}})
      }
    })
  }

  private setShortCuts(){
    var shortcut = {
      id: 'shortCutToNewList',
      shortLabel: 'Nueva lista',
      longLabel: 'Crea una nueva lista',
      iconFromResource: "screen", //filename w/o extension of an icon that resides on res/drawable-* (hdpi,mdpi..)
      intent: {
        action: 'android.intent.action.RUN',
        flags: 67108864, // FLAG_ACTIVITY_CLEAR_TOP
        data: 'tabs/tab2/', // Must be a well-formed URI
        extras: {
          'fromShortCuts': true, // Custom extras are also supported (boolean, number and string only)
        }
      }
    }

    window['plugins'].Shortcuts.setDynamic([shortcut], ()=> {
      console.log('Shortcuts were applied successfully')
      window.localStorage.setItem('shortCutsApplied', 'true')
      this.getIntent();
    }, function (error) {
      console.log('Error:' + error)
      window.localStorage.setItem('shortCutsApplied','false')
    })
  }
}

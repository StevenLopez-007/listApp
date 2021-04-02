import { Component, ViewChild,} from '@angular/core';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { ButtonSaveClickService } from '../../services/button-save-click.service';
import { AddProductFromTab1Service } from 'src/services/add-product-from-tab1.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { DatabaseService } from '../../services/database-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  configSuperTabs ={
    transitionDuration: 100,
    shortSwipeDuration: 250,
    dragThreshold:0
  }
  categoryToAddProduct:Object={};
  segment:number=0;
  constructor(private componentsUtilsService:ComponentsUtilsService,
    private serviceClick:ButtonSaveClickService,
    private addProductFromTab1Service:AddProductFromTab1Service,
    private Keyboard:Keyboard,
    private db:DatabaseService
    ) {}

  async ionViewDidEnter(){
    this.componentsUtilsService.setTabStatusBar('tab2');

    if(history['state']['segment']){
      this.segment = history['state']['segment'];
    }

    const observer = this.addProductFromTab1Service.data$.subscribe(async (res)=>{
      if(res){
        this.segment=res['segment'];
        const tabButton:HTMLElement = document.getElementById(`tabButton${this.segment}`) as HTMLElement ;
        tabButton.click();
      }
    });
    this.addProductFromTab1Service.clearProduct();
    observer.unsubscribe();
  }

  slideChange(ev){
    this.segment = ev['detail'];
    this.hideKeyboard();
  }

  tabChange(ev){
    this.segment = ev['detail']['index'];
    this.hideKeyboard();
  }

  save(ev){
    this.serviceClick.click.next({tab:this.segment,event:ev})
  }

  catSaved(cat:any){
    this.db.changeInCategories.next(cat)
  }

  hideKeyboard(){
    if(this.Keyboard.isVisible){
      this.Keyboard.hide();
    }
  }
}

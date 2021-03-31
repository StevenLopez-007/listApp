import { Component, ViewChild,} from '@angular/core';
import { IonSlides, IonTabs, } from '@ionic/angular';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { ButtonSaveClickService } from '../../services/button-save-click.service';
import { AddProductFromTab1Service } from 'src/services/add-product-from-tab1.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  configSuperTabs ={
    transitionDuration: 500,
    shortSwipeDuration: 250,
    dragThreshold:0
  }
  categoryToAddProduct:Object={};
  @ViewChild('slides') slides:IonSlides;
  @ViewChild(IonTabs) ionTabs:IonTabs;
  segment:number=0;
  constructor(private componentsUtilsService:ComponentsUtilsService,
    private serviceClick:ButtonSaveClickService,
    private addProductFromTab1Service:AddProductFromTab1Service,
    private Keyboard:Keyboard
    ) {}

  async ionViewDidEnter(){
    this.componentsUtilsService.setTabStatusBar('tab2');

    const observer = this.addProductFromTab1Service.data$.subscribe((res)=>{
      if(res){
        this.segment=res['segment'];
      }
    });
    this.addProductFromTab1Service.clearProduct();
    observer.unsubscribe();
  }

  async slideChange(ev){
    this.segment = ev['detail'];
    this.Keyboard.hide();
  }


  save(ev){
    this.serviceClick.click.next({tab:this.segment,event:ev})
  }
}

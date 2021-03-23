import { Component, ViewChild } from '@angular/core';
import { IonSlides, IonTabs } from '@ionic/angular';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { ButtonSaveClickService } from '../../services/button-save-click.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    // effect: slide,
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: false,
    loop: false
  };
  categoryToAddProduct:Object={};
  @ViewChild('slides') slides:IonSlides;
  @ViewChild(IonTabs) ionTabs:IonTabs;
  segment:number=0;
  constructor(private componentsUtilsService:ComponentsUtilsService,private serviceClick:ButtonSaveClickService) {}

  ionViewDidEnter(){
    if(history.state.data!=undefined){
      var category = history.state.data.category;

      delete category['countProducts'];
      this.categoryToAddProduct = category;
    }
    this.componentsUtilsService.setTabStatusBar('tab2');
    this.slides.slideTo(this.segment).then((res)=>{});
    if (history.state.data != undefined){this.segment = history.state.data.segment}
  }

  async segmentChange(ev:any){
    await this.slides.slideTo(this.segment)
  }

  async slideChange(){
    this.segment = await this.slides.getActiveIndex();
  }

  // get categoryToAddProduct(){
  //   if(history.state.data==undefined){
  //     console.log('entro')
  //     return {}
  //   }else{
  //     var category = history.state.data.category;

  //     delete category['countProducts'];
  //     return category;
  //   }
  // }

  save(ev){
    this.serviceClick.click.next({tab:this.segment,event:ev})
  }
}

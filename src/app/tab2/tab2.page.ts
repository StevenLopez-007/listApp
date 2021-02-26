import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ComponentsUtilsService } from '../../services/components-utils.service';

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
  @ViewChild('slides') slides:IonSlides;
  segment:number=0;
  constructor(private componentsUtilsService:ComponentsUtilsService) {}

  ionViewDidEnter(){
    this.componentsUtilsService.setTabStatusBar('tab2');
  }

  async segmentChange(ev:any){
    await this.slides.slideTo(this.segment)
  }

  async slideChange(){
    this.segment = await this.slides.getActiveIndex();
  }
}

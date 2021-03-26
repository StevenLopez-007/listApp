import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonSlides, IonTabs, IonSegmentButton } from '@ionic/angular';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { ButtonSaveClickService } from '../../services/button-save-click.service';
import { AddProductFromTab1Service } from 'src/services/add-product-from-tab1.service';
import { SegmentSlideAnimation } from 'src/animations/segmentsSlideAnimation';

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
  @ViewChildren(IonSegmentButton,{read:ElementRef}) segmentButtons:QueryList<ElementRef>;
  segment:number=0;
  constructor(private componentsUtilsService:ComponentsUtilsService,
    private serviceClick:ButtonSaveClickService,
    private addProductFromTab1Service:AddProductFromTab1Service,
    private segmentSlideAnimation:SegmentSlideAnimation) {}

  async ionViewDidEnter(){
    this.segmentSlideAnimation.config(this.segmentButtons,this.slides)
    this.componentsUtilsService.setTabStatusBar('tab2');
    await this.slides.slideTo(this.segment)

    const observer = this.addProductFromTab1Service.data$.subscribe((res)=>{
      if(res){
        this.segment=res['segment'];
      }
    });
    this.addProductFromTab1Service.clearProduct();
    observer.unsubscribe();
  }

  async segmentChange(ev:any){
    await this.slides.slideTo(this.segment)
  }

  async slideChange(){
    this.segment = await this.slides.getActiveIndex();
  }


  save(ev){
    this.serviceClick.click.next({tab:this.segment,event:ev})
  }
}

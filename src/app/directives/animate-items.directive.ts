import { AfterViewInit, ContentChildren, Directive, ElementRef, QueryList, Renderer2, OnInit, Input, OnDestroy } from '@angular/core';
import { IonItem } from '@ionic/angular';

@Directive({
  selector: '[appAnimateItems]',
  inputs:["className"]
})
export class AnimateItemsDirective implements AfterViewInit,OnDestroy{
  private observer: IntersectionObserver;
  className:string;
  @ContentChildren(IonItem,{read:ElementRef}) items:QueryList<ElementRef>;
  constructor(private renderer:Renderer2) { 
  }
  ngAfterViewInit(){
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry:any)=>{
        // console.log(entry)
        if(!entry.isIntersecting){
          this.renderer.addClass(entry.target,this.className);
        }else{
          this.renderer.removeClass(entry.target,this.className);
        }
      })

    },{threshold:0.4}); 

    this.items.forEach((item)=>{
      // console.log('For each de abajo',item)
      this.observer.observe(item.nativeElement);
    });
  }

  ngOnDestroy(){
    this.observer.disconnect()
  }
}

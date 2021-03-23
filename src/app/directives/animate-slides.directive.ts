import { Directive, Renderer2, AfterViewInit, ContentChildren, ElementRef, QueryList, Input, OnInit } from '@angular/core';
import { IonSlide } from '@ionic/angular';

@Directive({
  selector: '[appAnimateSlides]'
})
export class AnimateSlidesDirective implements AfterViewInit{

  private observer:IntersectionObserver;
  @ContentChildren(IonSlide,{read:ElementRef}) slides:QueryList<ElementRef>;
  @Input() className:string;
  constructor(private renderer:Renderer2) { }

  ngAfterViewInit(){
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(!entry.isIntersecting){
          this.renderer.addClass(entry.target,this.className);
        }else{
          this.renderer.removeClass(entry.target,this.className);
        }
      })
    },{threshold:0.1});

    this.slides.forEach((slide)=>{
      this.observer.observe(slide.nativeElement)
    });
  }

}

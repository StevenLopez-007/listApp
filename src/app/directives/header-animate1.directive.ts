import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AnimationController, DomController, Gesture, GestureController, GestureDetail, IonContent } from '@ionic/angular';

@Directive({
  selector: '[scrollHide]',
  // inputs:["contentApp"]
})
export class HeaderAnimate1Directive implements OnChanges {
  @Input('scrollHide') config: ScrollHideConfig;
  @Input('scrollContent') scrollContent: IonContent;

  contentHeight: number;
  scrollHeight: number;
  lastScrollPosition: number;
  lastValue: number = 0;

  private animation?: any;
  constructor(private element: ElementRef, private renderer: Renderer2, private domCtrl: DomController,
    private animationCtrl: AnimationController) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scrollContent && this.config) {
      this.scrollContent.scrollEvents = true;
      this.animation = this.animationCtrl.create()
      .addElement(this.element.nativeElement)
      .easing('linear')
      .duration(1000)
      .fromTo('margin-top', '0px', '-56px');
      let scrollStartFunc = async (ev) => {
        const el = await this.scrollContent.getScrollElement();
        // this.contentHeight = el.offsetHeight;
        // this.scrollHeight = el.scrollHeight;
        // if (this.config.maxValue === undefined) {
        //   this.config.maxValue = this.element.nativeElement.offsetHeight;
        // }
        this.lastScrollPosition = el.scrollTop;
      };

      if (this.scrollContent && this.scrollContent instanceof IonContent) {
        this.scrollContent.ionScrollStart.subscribe(scrollStartFunc);
        this.scrollContent.ionScroll.subscribe(async (ev) => this.adjustElementOnScroll(ev));
        this.scrollContent.ionScrollEnd.subscribe(async (ev) => this.adjustElementOnScroll(ev));

      } else if (this.scrollContent instanceof HTMLElement) {
        (this.scrollContent as HTMLElement).addEventListener('ionScrollStart', scrollStartFunc);
        (this.scrollContent as HTMLElement).addEventListener('ionScroll', async (ev) => this.adjustElementOnScroll(ev));
        (this.scrollContent as HTMLElement).addEventListener('ionScrollEnd', async (ev) => this.adjustElementOnScroll(ev));
      }
    }
  }

  private adjustElementOnScroll(ev) {
    if (ev) {
      this.domCtrl.write(async () => {
        const el = await this.scrollContent.getScrollElement();
        let scrollTop: number = el.scrollTop > 0 ? el.scrollTop : 0;
        let scrolldiff: number = scrollTop - this.lastScrollPosition;
        this.lastScrollPosition = scrollTop;
        let newValue = this.lastValue + scrolldiff;
        newValue = Math.max(0, Math.min(newValue, this.config.maxValue));
        // console.log(this.animation)
        // this.animation.progressStart()
        // this.animation.progressStep((newValue*1)/this.config.maxValue)

        this.renderer.setStyle(this.element.nativeElement,this.config.cssProperty,`-${newValue}px`);
        this.lastValue = newValue;
      });
    }
  }
}

export interface ScrollHideConfig {
  cssProperty: string;
  maxValue: number;
}

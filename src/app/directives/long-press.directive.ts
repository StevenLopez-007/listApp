import { Gesture, GestureController, GestureDetail } from '@ionic/angular';
import { Directive, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective implements OnInit{
  ionicGesture:Gesture;
  progress:number=0;
  timerSub: Subscription;
  protected interval: any;
  @Output() longPressed:EventEmitter<any>= new EventEmitter();
  constructor(private elementRef:ElementRef,private gestureCtrl:GestureController) { }

  ngOnInit() {
    const isTouch = ('ontouchstart' in document.documentElement);
    const element = this.elementRef.nativeElement;
    element.onpointerdown = (ev) => {
      this.timerSub = timer(500).subscribe(() => {
        this.longPressed.emit(ev);
      });
    };
    element.onpointerup = () => { this.unsub(); };
    element.onpointercancel = () => { this.unsub(); };
    if (isTouch) {
      element.onpointerleave = () => { this.unsub(); };
    }
  }

  private unsub() {
    if (this.timerSub && !this.timerSub.closed) { this.timerSub.unsubscribe(); }
  }

}

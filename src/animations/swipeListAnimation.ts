import { Injectable, ElementRef } from '@angular/core';
import { Gesture, GestureController, AnimationController, ModalController } from '@ionic/angular';
@Injectable()
export class SwipeList {
    gesture: Gesture;
  animation?: any;
  heightWindow: number;
  numberLow: number;
  difIntervalo: number;
  private started: boolean = false;
  constructor(private gestureCtrl: GestureController, private animationCtrl: AnimationController) { }

  swipeAnimation(barSwipe:ElementRef){
    this.configSteps();
    this.animation = this.animationCtrl.create()
      .addElement(document.querySelector('.tuslistas'))
      .easing('linear')
      .duration(500)
      .fromTo('height', '85%', '45%');

    this.gesture = this.gestureCtrl.create({
      el: barSwipe.nativeElement,
      threshold: 0,
      gestureName: 'swipeAnimation',
      onMove: (ev) => { this.onMove(ev) },
      onEnd: (ev) => { this.onEnd(ev) }
    });

    this.gesture.enable(true);
  }

  private onMove(ev) {
    if (!this.started) {
      this.animation.progressStart(true, this.getStep(ev));
      this.started = true;
    }
    this.animation.progressStep(this.getStep(ev));
  }

  private onEnd(ev) {
    const step = this.getStep(ev);
    if (!this.started) { return; }
    this.gesture.enable(false);
    const shouldComplete = step > 0.45;
    this.animation.progressEnd((shouldComplete) ? 1 : 0, step)
    this.gesture.enable(true);
    this.started = false;
  }

  private clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
  }

  private getStep(ev) {
    return this.clamp(0, (ev.currentY - this.numberLow) / this.difIntervalo, 1);
  }

   configSteps() {
    this.heightWindow = window.innerHeight;
    this.numberLow = this.heightWindow - (this.heightWindow * 0.85);
    this.difIntervalo = ((this.heightWindow + 37) - (this.heightWindow * 0.45)) - this.numberLow;
  }
}
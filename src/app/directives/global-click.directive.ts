import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appGlobalClick]'
})
export class GlobalClickDirective {
  @Output() clickButton:EventEmitter<any> = new EventEmitter();
  constructor() { }
  
  @HostListener('click')
  onClick(){
    console.log('hizo click')
    this.clickButton.emit();
  }
}

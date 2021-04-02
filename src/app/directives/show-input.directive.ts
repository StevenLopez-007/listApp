import { Directive, OnInit, Renderer2, ElementRef, ContentChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonButton, IonInput } from '@ionic/angular';

@Directive({
  selector: '[appShowInput]'
})
export class ShowInputDirective implements OnInit, OnChanges {

  @ContentChild(IonInput) input: IonInput;
  @Input() editProd: boolean = false;
  @Output() closeEdit: EventEmitter<any> = new EventEmitter();
  constructor(private element: ElementRef, private renderer: Renderer2, private keyboard: Keyboard) { }


  ngOnChanges() {
    if (this.editProd) {
      this.renderer.setStyle(this.element.nativeElement, "display", "block");
      setTimeout(() => {
        this.renderer.setStyle(this.element.nativeElement, 'opacity', 1);
      }, 200)
    }
    else{
      this.renderer.setStyle(this.element.nativeElement,'opacity',0);
      setTimeout(()=>{
        this.renderer.setStyle(this.element.nativeElement, "display", "none");
      },150)
    }
    setTimeout(async () => {
      if (this.editProd) {
        await this.input.setFocus();
      }
      else {
        this.input.value = '';
      }
    }, 100)
  }
  ngOnInit() {
    
    this.keyboard.onKeyboardWillHide().subscribe((res) => {
      this.closeEdit.emit();
    });
  }
}

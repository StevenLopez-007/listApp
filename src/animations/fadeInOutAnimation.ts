import { trigger, transition, style, animate } from '@angular/animations';
export class FadeInAndOut{

    constructor(){

    }

    configAnimation(){
        return trigger('checkItemsDelete', [
            transition(':enter', [style({ opacity: 0 }), animate('0.12s ease-in', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('0.12s ease-in', style({ opacity: 0 }))])
          ])
    }
}
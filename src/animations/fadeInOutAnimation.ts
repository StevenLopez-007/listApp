import { trigger, transition, style, animate } from '@angular/animations';
export class FadeInAndOut{

    constructor(){

    }

    configAnimation(duration:number=0.12){
        return trigger('checkItemsDelete', [
            transition(':enter', [style({ opacity: 0 }), animate(`${duration}s ease-in`, style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate(`${duration}s ease-in`, style({ opacity: 0 }))])
        ])
    }

    configAnimationTwoElements(){
        return [
            trigger('element1Show', [
            transition(':enter', [style({ opacity: 0 }), animate('0.12s ease-in', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('0.12s ease-in', style({ opacity: 0 }))])
        ]),
        trigger('element2Show',[
            transition(':enter', [style({ opacity: 0 }), animate('0.12s ease-in', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('0.12s ease-in', style({ opacity: 0 }))])
        ])
        ]
    }

    configAnimationTranslateEdit(duration:number = 0.12){
        return trigger('translateElement', [
            transition(':enter', [style({  transform: 'translate3d(0,-100%,0)' }), animate(`${duration}s ease-in-out`, style({  transform: 'translate3d(0,0,0)' }))]),
            transition(':leave', [style({  transform: 'translate3d(0,0,0)' }), animate(`${duration}s ease-in`, style({  transform: 'translate3d(0,-100%,0)' }))])
        ])
    }
}
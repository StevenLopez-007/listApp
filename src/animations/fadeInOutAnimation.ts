import { trigger, transition, style, animate } from '@angular/animations';

export const checkItemsDelete = trigger('checkItemsDelete', [
    transition(':enter', [style({ opacity: 0 }), animate(`0.12s ease-in`, style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate(`0.12s ease-in`, style({ opacity: 0 }))])
])

export const translateElement = trigger('translateElement', [
    transition(':enter', [style({  transform: 'translate3d(0,-100%,0)' }), animate(`0.12s ease-in-out`, style({  transform: 'translate3d(0,0,0)' }))]),
    transition(':leave', [style({  transform: 'translate3d(0,0,0)' }), animate(`0.12s ease-in`, style({  transform: 'translate3d(0,-100%,0)' }))])
])
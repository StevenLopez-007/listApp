import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonSaveClickService {
  click:BehaviorSubject<any> = new BehaviorSubject(null);
  click$= this.click.asObservable();
  constructor() { }

  clickEvent(ev:any){
    this.click.next(ev)
  }
}

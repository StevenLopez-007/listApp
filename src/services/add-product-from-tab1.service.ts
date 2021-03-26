import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductFromTab1Service {
  private data:BehaviorSubject<any>= new BehaviorSubject(null);
  data$ = this.data.asObservable();
  constructor() { }

  addProduct(data:Object){
    this.data.next(data)
  }

  clearProduct(){
    this.data.next(null)
  }
}

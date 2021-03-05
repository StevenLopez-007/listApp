import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumPrice'
})
export class SumPricePipe implements PipeTransform {

  transform(products:Array<any>){
    return products.reduce((accumulator, currentValue)=>{
      return accumulator + currentValue['precio'];
    },0)
  }

}

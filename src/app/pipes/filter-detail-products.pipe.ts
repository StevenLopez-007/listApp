import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDetailProducts'
})
export class FilterDetailProductsPipe implements PipeTransform {

  transform(products: Array<any>=[],name:string='') {
    if(name == ''){
      return products
    }else{
      return products.filter((prod)=>{
        return prod['name'].toLowerCase().match(name.toLowerCase())
      })
    }
  }

}

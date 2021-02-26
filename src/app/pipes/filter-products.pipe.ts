import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Array<any>=[], search:string='',searchBy:string='',filterByCat:boolean): unknown {
    if(search=='' && searchBy==''){
      return products;
    }
    else if(!filterByCat){
      return products.filter(product=>{
        return product['name'].toLowerCase().match(search.toLowerCase())
      })
    }
    else{
      return products.filter(product=>{
        return product['name'].toLowerCase().match(search.toLowerCase()) && product['nameCat']==searchBy;
      })
    }
  }

}

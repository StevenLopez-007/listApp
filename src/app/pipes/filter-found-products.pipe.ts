import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFoundProducts'
})
export class FilterFoundProductsPipe implements PipeTransform {

  transform(productsFound: Array<any>=[], products:Array<any>=[],productsAggregates:Array<any>=[]){
    if(products.length>0 || productsAggregates.length>0){
      var productsToFilter = products.concat(productsAggregates)
      return productsFound.filter(prodFound=>{
        return this.existProd(productsToFilter,prodFound['id_product'])
        
      })
    }
    else{
      return productsFound;
    }
  }

  existProd(products:Array<any>,id_product:any):Boolean{
    var found =true;
    for (let index = 0; index < products.length; index++) {
      if(products[index]['id_product'] == id_product){
        found = false;
        break;
      } 
    }
    return found;
  }

}

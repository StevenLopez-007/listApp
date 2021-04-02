import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../../model/list';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(lists: Array<List>=[], name:string="",state:number,orderByDate:string) {
    // if(name==''){
    //   return lists
    // }else{
    //   return lists.filter((list)=>{
    //     return list['nameList'].toLowerCase().match(name.toLowerCase())
    //   })
    // }
    if(state<=3){
      return lists.filter((list)=>{
        return list['nameList'].toLowerCase()
        .match(name.toLowerCase()) && list['state'] == state
      }).sort((a,b)=>{
        let dateA = new Date(a['date']).getTime();
        let dateB = new Date(b['date']).getTime();
        return orderByDate=='asc'?dateB-dateA:dateA-dateB;
      })
    }else{
      return lists.filter((list)=>{
        return list['nameList'].toLowerCase()
        .match(name.toLowerCase())
      }).sort((a,b)=>{
        let dateA = new Date(a['date']).getTime();
        let dateB = new Date(b['date']).getTime();
        return orderByDate=='asc'?dateB-dateA:dateA-dateB;
      })
    }
  }

}

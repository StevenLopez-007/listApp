import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorCards'
})
export class ColorCardsPipe implements PipeTransform {
  colors = [
    'linear-gradient(45deg, rgba(255,48,90,1) 10%, rgba(255,85,137,1) 100%)',
    'linear-gradient(17deg, rgba(3,126,255,1) 10%, rgba(11,172,253,1) 100%)',
    'linear-gradient(17deg, rgba(253,168,36,1) 10%, rgba(254,198,61,1) 100%)'
];
  transform(value:any,index:number) {
    switch (index%3) {
      case 0: {
        return this.colors[0]
      }
      case 1: {
        return this.colors[1]
      }
      case 2: {
        return this.colors[2]
      }
      default: {
        break;
      }
    }
    return null;
  }

}

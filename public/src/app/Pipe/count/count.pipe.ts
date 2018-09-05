import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const list=[];
   if(value !==null ){
     if(typeof(value)=='object'){
      return value.length;
     }
   }
  }
}

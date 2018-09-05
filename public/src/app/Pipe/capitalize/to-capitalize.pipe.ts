import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCapitalize'
})
export class ToCapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
   
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyandvalue'
})
export class KeyandvaluePipe implements PipeTransform {

  transform(value, args:number) : any {
    if(!value){
      return 0; 
    }
    return value[args];
 
  }

}

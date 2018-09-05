import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value,totalValue:any) : any {
    if(!value){
      return 0; 
    }
     // console.log((100 * value) / totalValue);
      return (100 * value) / totalValue;
   
  }

}

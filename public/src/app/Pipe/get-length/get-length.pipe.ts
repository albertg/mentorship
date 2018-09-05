import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getLength'
})
export class GetLengthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

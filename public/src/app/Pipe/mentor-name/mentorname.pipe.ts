import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mentorname'
})
export class MentornamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value !==null){
    return value.firstName;
  }
  else{
    return "0";
  }
}

}

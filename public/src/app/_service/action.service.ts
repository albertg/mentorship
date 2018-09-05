import { Injectable } from '@angular/core';

@Injectable()
export class ActionService {

public mentor;

   clickAction(data,role){
    this.mentor='';
    this.mentor=data;
console.log('click action  data'+data);
   }


  }



import { Injectable,ErrorHandler } from '@angular/core';

@Injectable()
export class ErrorHandlingService extends ErrorHandler{

  constructor() { 
    super();
  }
  handleError(error){
    let timeDate=new Date();
    console.error('This  Error is ',{
      time:timeDate.toISOString(),
      Message:error.message,
      zone:error.zone,
      task:error.task

    })

  }

}

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {
  }
  
  getemployee(id:any): Observable<any>{
      return this.http.get(GlobalVariable.API_URL+'employee/practice/'+id+'/users')
      .map((response: Response)  => response);
  
   }
  

}

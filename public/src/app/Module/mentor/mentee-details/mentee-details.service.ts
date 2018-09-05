import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class MenteeDetailsService {

  constructor(private http: HttpClient) {
  }
  
  getGoals(id:any): Observable<any>{
      return this.http.get(GlobalVariable.API_URL+'goals/mentee/'+id)
      .map((response: Response)  => response);
  
   }
   menteeoverview(id:any): Observable<any>{
    return this.http.get(GlobalVariable.API_URL+'mentee/'+id+'/overview')
    .map((response: Response)  => response);

 }

}

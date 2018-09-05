import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class MenteeListService {


  constructor(private http: HttpClient) {
  }
  

  promotementor(id:any): Observable<any>{
     let body='';
    return this.http.put(GlobalVariable.API_URL+'employee/'+id+'/promote/mentor',body)
    .map((response: Response)  => response);
}
}
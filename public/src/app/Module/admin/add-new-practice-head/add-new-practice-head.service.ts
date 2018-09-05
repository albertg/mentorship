import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';;

@Injectable()
export class AddNewPracticeHeadService {

  constructor(private http: HttpClient) {}

  getallmembers(): Observable<any>{
    return this.http.get(GlobalVariable.API_URL+'employee/practice/unassigned')
    .map((response: Response)  => response);
  
  }
  updatepracticeead(practiceid:any,phId): Observable<any>{
    let body='';
    return this.http.put(GlobalVariable.API_URL+'practice/'+practiceid+'/assign/'+phId,body)
    .map((response: Response)  => response);

 }
}

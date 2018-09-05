import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';;

@Injectable()
export class AddNewMembersService {

  constructor(private http: HttpClient) {}

  getallmembers(): Observable<any>{
    return this.http.get(GlobalVariable.API_URL+'employee/practice/unassigned')
    .map((response: Response)  => response);
  
  }
  updatemember(practiceid:any,body): Observable<any>{
    return this.http.put(GlobalVariable.API_URL+'employee/practice/'+practiceid+'/assign',body)
    .map((response: Response)  => response);

 }

}

//
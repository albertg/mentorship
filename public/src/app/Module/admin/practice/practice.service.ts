import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';;

@Injectable()
export class PracticeService {

  constructor(private http: HttpClient) {}

  getall(id): Observable<any>{
    return this.http.get(GlobalVariable.API_URL+'employee/practice/'+id+'/members')
    .map((response: Response)  => response);
  
  }

}
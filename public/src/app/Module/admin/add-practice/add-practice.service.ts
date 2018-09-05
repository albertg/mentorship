import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';;

@Injectable()
export class AddPracticeService {

  constructor(private http: HttpClient) {}

  addpractice(body): Observable<any>{
    return this.http.post(GlobalVariable.API_URL+'practice/add',body)
    .map((response: Response)  => response);
  
  }

}

///
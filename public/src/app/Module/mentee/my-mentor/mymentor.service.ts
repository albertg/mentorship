import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class MymentorService {

  constructor(private http: HttpClient) {}

  mentorlist(id): Observable<any>{
    return this.http.get(GlobalVariable.API_URL+'mentor-mentee-list/'+id)
    .map((response: Response)  => response);
  
  }

}

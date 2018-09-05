import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
}

loginRequest(body): Observable<any>{
    return this.http.post(GlobalVariable.API_URL+'signin',body)
    .map((response: Response)  => response);

 }

}

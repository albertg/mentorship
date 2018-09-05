import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class AssignMentorService {


  constructor(private http: HttpClient) {
  }
  

   updatementor(id:any,body): Observable<any>{
    return this.http.put(GlobalVariable.API_URL+'mentor/'+id+'/assign/',body)
    .map((response: Response)  => response);
}
}
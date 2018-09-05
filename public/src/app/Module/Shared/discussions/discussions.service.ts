import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class DiscussionsService {

  constructor(private http: HttpClient) {
  }

   postDiscussions(body): Observable<any>{
    return this.http.post(GlobalVariable.API_URL+'discussions/add',body)
    .map((response: Response)  => response);

    }

  getmentoringdiscussion(id:any): Observable<any>{
    return this.http.get(GlobalVariable.API_URL+'discussions/mentee/'+id)
    .map((response: Response)  => response);
    
 }
 deleteDiscussion(id:any): Observable<any>{
  return this.http.delete(GlobalVariable.API_URL+'deletementoringdiscussion/'+id)
  .map((response: Response)  => response);

}
   
  }
  
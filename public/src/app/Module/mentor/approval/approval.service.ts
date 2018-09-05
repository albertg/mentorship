import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class ApprovalService {

  
  constructor(private http: HttpClient) {
  }
  
  getapproval(id): Observable<any>{
      return this.http.get(GlobalVariable.API_URL+'goals/approvals/'+id)
      .map((response: Response)  => response);
  
   }

   updateapproval(body): Observable<any>{
    return this.http.post(GlobalVariable.API_URL+'goals/approvals/act',body)
    .map((response: Response)  => response);

    }


    
  }


///api/goals/approvals/:mentorId
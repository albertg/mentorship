import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class GoalsService {

  constructor(private http: HttpClient) {
  }
  
  getGoals(id): Observable<any>{
      return this.http.get(GlobalVariable.API_URL+'goals/mentee/'+id)
      .map((response: Response)  => response);
  
   }

   postGoals(body): Observable<any>{
    return this.http.post(GlobalVariable.API_URL+'goals/add',body)
    .map((response: Response)  => response);

    }

    getGoalstypes(): Observable<any>{
      return this.http.get(GlobalVariable.API_URL+'goals/types')
      .map((response: Response)  => response);
  
   }
    
  }
  
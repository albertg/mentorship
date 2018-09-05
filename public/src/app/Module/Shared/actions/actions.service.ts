import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVariable} from '../../../Config/app.confic';

@Injectable()
export class ActionsService {

  constructor(private http: HttpClient) {
  }

   postactions(body,id): Observable<any>{
    return this.http.post(GlobalVariable.API_URL+'goals/'+ id+'/actions/add',body)
    .map((response: Response)  => response);

    }

    getactions(id): Observable<any>{
      return this.http.get(GlobalVariable.API_URL+'goals/'+id+'/actions')
      .map((response: Response)  => response);
  
      }

      updateactions(actionId,statusId): Observable<any>{
        let body=''
        ///action/:actionId/update/status/:statusId
        return this.http.put(GlobalVariable.API_URL+'action/'+actionId+'/update/status/'+statusId,body)
        .map((response: Response)  => response);
    
        }


  }
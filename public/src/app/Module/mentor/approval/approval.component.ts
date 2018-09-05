import { Component, OnInit,ViewChild, AfterViewInit,Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {ApprovalService} from './approval.service';
import { UserserviceService } from '../../../_service/userservice.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  
  @Output() refresh = new EventEmitter();
  listofapproval;
  showerror;
  constructor(private api:ApprovalService,
    private Userservice:UserserviceService,
    private router: Router,
    private toastr: ToastrService,
    private route : ActivatedRoute,
  
  ) { }

  ngOnInit() {
    this.getapproval();
   
  }

  updateapproval(id,status){

    let body = {
      "actionId": id,
      "status": status,
      "comments": ''
    };
    this.api.updateapproval(body).subscribe(data => {
     
      if (data.status == 'success') {
        this. getapproval();
        this.refresh.emit();
        this.toastr.success('success', 'success');
      }
      else {
        this.toastr.error('error', 'error');
      }
   
      
      });
    
  }
  getapproval(){
    this.api.getapproval(this.Userservice.userid).subscribe(data => {
      this.listofapproval=data;
      if(data.length==0){
        this.showerror=true;
      }
      else{
        this.showerror=false;
      }
      });
  }

}

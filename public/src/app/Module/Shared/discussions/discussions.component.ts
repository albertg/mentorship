import { Component, OnInit,ViewChild, AfterViewInit,Input, Output,EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {DiscussionsService} from './discussions.service';
import { UserserviceService } from '../../../_service/userservice.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  button=false;
list;
userrole;
showerror;
@Output() realoaddisscussions = new EventEmitter();
  constructor(private api:DiscussionsService,
    private Userservice:UserserviceService,
    private router: Router,
    private toastr: ToastrService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.getdiscussion();
    this.userrole=this.Userservice.role;

  }
  mentoring(value){
    let body={
      "discussionText": value.discussiontopic,
      "mentee": this.route.snapshot.params.id,
      "mentor":this.Userservice.userid
    };
    this.api.postDiscussions(body).subscribe(data => {

      if(data.status=='success'){
        this.realoaddisscussions.emit();
        this.getdiscussion();
       this.toastr.success('success', 'success');
        
      }
      else{
        this.toastr.error('error', 'error');
      }  
  });
  }
  delete(id){
 
    this.api.deleteDiscussion(id).subscribe(data => {
      if(data){
        confirm('Delete Discussion');
        $('.rowmentor-'+id).closest( "li" ).hide();
      
      }
      
  });
  }

  getdiscussion(){
    this.api.getmentoringdiscussion(this.route.snapshot.params.id).subscribe(data => {
      this.list=data;
      if(data.length==0){
        this.showerror=true;
      }
      else{
        this.showerror=false;
      }
  });
  }
}

import { Component, OnInit,ViewChild, AfterViewInit,Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {GoalsService} from './goals.service';
import { UserserviceService } from '../../../_service/userservice.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  meteeid;
  goalstype;
 
  @Output() realoadgoals = new EventEmitter();

  constructor(private api:GoalsService,
    private Userservice:UserserviceService,
    private router: Router,
    private toastr: ToastrService,
    private route : ActivatedRoute,
  
  ) { }
 
  ngOnInit() {

this.api.getGoalstypes().subscribe(data => {
this.goalstype=data;

});

  }

  postgoal(value){
    let body={
      "description": value.description,
      "goalType": value.goalType,
      "mentee": this.route.snapshot.params.id,
      "mentor":this.Userservice.userid
    };
    this.api.postGoals(body).subscribe(data => {
    
if(data.status=='success'){
  this.realoadgoals.emit();
 this.toastr.success('success', 'success');
 
}
else{
  this.toastr.error('error', 'error');
}
      
  });

  }

}

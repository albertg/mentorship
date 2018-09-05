import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import { MenteeDetailsService } from './mentee-details.service';
import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-mentee-details',
  templateUrl: './mentee-details.component.html',
  styleUrls: ['./mentee-details.component.css']
})
export class MenteeDetailsComponent implements OnInit {
  totalgoals = 0;
  completed = 0;
  inprogress = 0;
  notstarted = 0;
  golslist;
  userrole;
  actionList;
  discussions;
  name;
  email;
  profileImage;
  mentor;
  goalid;
  firstName;
  lastName;
  showerror;
  constructor(private api: MenteeDetailsService,
    private Userservice: UserserviceService,
    private router: Router,
    private route : ActivatedRoute) { }
  ngOnInit() {
    this.userrole=this.Userservice.role;
  
    this.realoadgoal();
   /*this.api.getGoals(this.route.snapshot.params.id).subscribe(data => {
      this.golslist = data;
    });*/

  }

  addaction(actionList,id){

    this.actionList=actionList;
    this.goalid=id;
  }

  realoadgoal() {
    this.api.menteeoverview(this.route.snapshot.params.id).subscribe(data => {
      if(data.goalsOverview.goals==0){
        this.showerror=true;
      }
      else{
        this.showerror=false;
      }
      this.discussions=data.discussions;
      //this.name=data.name;
      this.firstName=data.firstName;
      this.lastName=data.lastName;
      this.email=data.email;
      this.mentor=data.mentor;
      this.profileImage=data.profileImage;
      this.golslist = data.goalsOverview.goals;
      this.totalgoals = data.goalsOverview.overview.totalGoals;
      this.completed = data.goalsOverview.overview.completed;
      this.inprogress = data.goalsOverview.overview.inProgress;
      this.notstarted =data.goalsOverview.overview.notStarted;
    });
}
}
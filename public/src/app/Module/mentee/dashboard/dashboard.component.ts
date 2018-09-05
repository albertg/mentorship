import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import { MenteeDetailsService } from '../../mentor/mentee-details/mentee-details.service';
import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalgoals = 0;
  completed = 0;
  inProgress = 0;
  notStarted = 0;
  golslist;
  userrole;
  actionList;
  discussions;
  name;
  email;
  profileImage;
  mentor;
  goalid;
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
  
      this.discussions=data.discussions;
      this.name=data.name;
      this.email=data.email;
      this.mentor=data.mentor;
      this.profileImage=data.profileImage;
      this.golslist = data.goalsOverview.goals;
      this.totalgoals = data.goalsOverview.overview.totalGoals;
      this.completed = data.goalsOverview.overview.completed;
      this.inProgress = data.goalsOverview.overview.inProgress;
      this.notStarted =data.goalsOverview.overview.notStarted;
    });
}
}


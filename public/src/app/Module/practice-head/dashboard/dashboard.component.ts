import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mentors;
  mentees;
  firstName;
  lastName;
  email;
  profileImage;
  inprogress=0;
  notstarted=0;
  completed=0;
  totalgoals=0;
  mentorscount;
  menteescount;
  constructor(private api: DashboardService,
    private Userservice: UserserviceService,
    private router: Router,
    private route : ActivatedRoute) { }

    //api/employee/ph/12/assigned
  ngOnInit() {
    this.employee();
    this.firstName=this.Userservice.firstname;
    this.lastName=this.Userservice.lastName
    this.email=this.Userservice.email;
    this.profileImage=this.Userservice.profileimage;

  }
  employee() {
    this.api.getemployee(this.Userservice.practiceId).subscribe(data => {
  
      this.mentors=data.mentors;
      this.mentees=data.mentees;

      this.mentorscount=data.mentors.length;
      this.menteescount=data.mentees.length;

    });
}
refresh(){
  this.employee();
}
}

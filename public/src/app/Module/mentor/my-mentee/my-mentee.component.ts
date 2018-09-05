import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {MymenteeService} from './mymentee.service';
import { UserserviceService } from '../../../_service/userservice.service';
import { ActionService } from '../../../_service/action.service';

@Component({
  selector: 'app-my-mentee',
  templateUrl: './my-mentee.component.html',
  styleUrls: ['./my-mentee.component.css']
})
export class MyMenteeComponent implements OnInit {
  totalgoals=0;
  completed=0;
  inprogress=0;
  notstarted=0;
  searchText;
  menteecount;
  firstName;
  lastName;
  email;
  profileImage;
  constructor(private api:MymenteeService,
    private router: Router,
    private route: ActivatedRoute,
    private Userservice:UserserviceService,
    private action:ActionService) { }
    menteelists;
    
  ngOnInit() { //this.Userservice.userid
  
    this.getgoals();

    if(this.Userservice.role==='mentor'){
      this.firstName=this.Userservice.firstname
      this.lastName=this.Userservice.lastName;
      this.profileImage=this.Userservice.profileimage;
    }
    else{
      this.firstName=this.action.mentor.firstName;
      this.lastName=this.action.mentor.lastName;
      this.profileImage=this.action.mentor.profileImage;
    }
  }

calculateGoals(data){
  this.totalgoals=0;
  this.completed=0;
  this.inprogress=0;
  this. notstarted=0;
  data.forEach(items => {
    if(items.goals!==null){
      this.totalgoals+=items.goals.totalGoals;
      this.completed+=items.goals.completed;
      this.inprogress+=items.goals.inProgress;
      this.notstarted+=items.goals.notStarted;
    }
    
  });

}
getgoals(){
  this.api.menteelist(this.route.snapshot.params.id).subscribe(data => {
    this.menteelists=data;
    this.menteecount=data.length;
    this.calculateGoals(data)
     })
}

}

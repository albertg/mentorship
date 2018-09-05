import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {LoginService} from './login.service';
import { UserserviceService } from '../../../_service/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api:LoginService,
    private Userservice:UserserviceService,
    private router: Router) { }

  ngOnInit() {
  }

  auth(value){
    let body={
      "email": value.username,
      "pwd": value.password

    };
this.api.loginRequest(body).subscribe(data => {
  if(data.status='success'){
    this.Userservice.setUserlogin(data.payload);
    if(data.payload.roles[0].roleName=='mentor'){
      this.router.navigate(['mentor/'+data.payload.id]);
    }
    else if(data.payload.roles[0].roleName=='mentee'){
      this.router.navigate(['menteeinfo/'+data.payload.id]);
    }
    else if(data.payload.roles[0].roleName=='practicehead'){
      this.router.navigate(['practicehead/'+data.payload.id]);
    }
    else if(data.payload.roles[0].roleName=='admin'){
      this.router.navigate(['admin/'+data.payload.id]);
    }
    
 
  }

/*
if(data.status='success'){
  this.router.navigate(['dashboard']);
  this.Userservice.setUserlogin(data);

  if(data.roles[0].roleName=='mentor'){
    this.router.navigate(['dashboard']);
  }
  else if(data.roles[0].roleName=='mentee'){
    this.router.navigate(['menteeinfo'+3]);
  }
  */
  /*  else if(data.myMentee >=1 && data.myMentor==null){
      console.log(' i am  a menter and mentee');
      this.router.navigate(['mdashboard']);
    }
    else if(data.myMentor==null){
      console.log(' i am  not a mentee or menter');
      this.router.navigate(['mdashboard']);
    }
    else{
     // this.router.navigate(['mdashboard']);
     console.log(' i am  a mentee ');
     this.router.navigate(['mdashboard']);
    }*/
 // }
//this.router.navigate(['dashboard']);

});
   
  }
}
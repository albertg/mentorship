import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../../_service/userservice.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private Userservice:UserserviceService,
    private router: Router,
  ) { }
name;
lastName;
id;
userrole;
  ngOnInit() {
    this.name=this.Userservice.firstname;
    this.lastName=this.Userservice.lastName;
    
    this.id=this.Userservice.userid;
    this.userrole=this.Userservice.role;
  }

  logOut(){
   
    this.Userservice.logout();
    //let url=window.location.origin;
    window.location.replace(window.location.origin);
    
    //this.router.navigate(['']);
  }
  index(){
    if(this.Userservice.role=='practicehead'){
      this.router.navigate(['/practicehead'+this.Userservice.userid]);
    }
    else if(this.Userservice.role=='mentor'){
      this.router.navigate(['/mentor'+this.Userservice.userid]);
    }
    else if(this.Userservice.role=='mentee'){
      this.router.navigate(['/mentee'+this.Userservice.userid]);
    }
  
    else{ 
      this.router.navigate(['/home']);
    }
  }

}

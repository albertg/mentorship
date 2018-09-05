import { Component, OnInit, Output, ElementRef } from '@angular/core';

import { UserserviceService } from '../../../_service/userservice.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private Userservice:UserserviceService,
    private router: Router,
  ) { }
  ngOnInit() {


}


/* user(){
  console.log(this.Userservice);
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
 // 
}

logOut(){
  this.Userservice.logout();
  this.router.navigate(['/home']);
} */
}

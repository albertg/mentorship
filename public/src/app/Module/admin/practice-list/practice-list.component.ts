import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {PracticeListService} from './practice-list.service';
import { UserserviceService } from '../../../_service/userservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css']
})
export class PracticeListComponent implements OnInit {

  list;
  pid;
  userrole;
  showerror;
  constructor(private api:PracticeListService,
    private router: Router,
    private route: ActivatedRoute,
    private Userservice:UserserviceService,) { }


  ngOnInit() {
    this.getpractice();
  this.userrole=this.Userservice.role;
  }


  getpractice(){
    this.api.getpractice().subscribe(data => {
 this.list=data;
 if(data.length==0){
  this.showerror=true;
}
else{
  this.showerror=false;
}

       })
  }
  getpid(id){
    this.pid=id;
  }
  rename(a){
    if(a){
      return a.id
    }

    //console.log(a.firstName )
    // if(JSON.stringify(a)==='null'){
      
    //   return false;
    // }
    //  else{
    //   console.log('true');
 
    //    return true;
    //   }  
  }
  refresh(){
    this.getpractice();
  }
 
}

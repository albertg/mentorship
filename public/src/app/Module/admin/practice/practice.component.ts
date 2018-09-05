import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {PracticeService} from './practice.service';
import { UserserviceService } from '../../../_service/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { visitAll } from '@angular/compiler';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
list;
title;
searchText;
showerror;
  constructor(private api:PracticeService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private Userservice:UserserviceService,) { }


  ngOnInit() {

    this.title=this.route.snapshot.params.title;

    this.api.getall(this.route.snapshot.params.id).subscribe(data => {
    this.list=data;
    if(data.length==0){
      this.showerror=true;
    }
    else{
      this.showerror=false;
    }

    });
  }

  redirect(){
    
  }

}

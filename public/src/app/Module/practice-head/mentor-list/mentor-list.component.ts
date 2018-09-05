import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ActionService } from '../../../_service/action.service';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {
  @Input()
  mentorlist:any;
  @Output() refreshdata = new EventEmitter();
  mid;
  searchText;
  constructor(private router: Router,
    private Userservice: UserserviceService,
    private ActionService:ActionService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() { //this.Userservice.userid

  }
  reaload(){
    this.refreshdata.emit();
    console.log('reaload it is working');
  }

  rementor(id,data){
    this.ActionService.clickAction(data,"mentor");
    this.router.navigate(['mentor/'+id]);
  }
  getmid(id){
    this.mid=id;

  }
}
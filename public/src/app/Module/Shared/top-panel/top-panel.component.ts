import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {
  @Input()
  totalgoals:any;

  @Input()
  completed:any;

  @Input()
  inprogress:any;

  @Input()
  notestarted:any;

  @Input()
  name:any;
  @Input()
  firstName:any;
  @Input()
  lastName:any;
  @Input()
  userrole:any;
  
  @Input()
  email:any;

  @Input()
  mentors:any;
  @Input()
  mentees:any;
  @Input()
  profileImage:any;
  @Input()
  title:any;
  
  @Input()
  page:any;
  @Input()
  discussions:any;
  
  role;
  constructor(  private Userservice:UserserviceService,) { }

  
  ngOnInit() {

    this.role=this.Userservice.role;
console.log(this.page);
  }

}

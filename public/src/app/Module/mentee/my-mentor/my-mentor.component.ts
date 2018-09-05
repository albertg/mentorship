import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {MymentorService} from './mymentor.service';
import { UserserviceService } from '../../../_service/userservice.service';

@Component({
  selector: 'app-my-mentor',
  templateUrl: './my-mentor.component.html',
  styleUrls: ['./my-mentor.component.css']
})
export class MyMentorComponent implements OnInit {

  constructor(private api:MymentorService,
    private router: Router,
    private route: ActivatedRoute,
    private Userservice:UserserviceService,) { }
  list;
  ngOnInit() {
    /*this.api.mentorlist(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      const mentorlist=[];

      this.list=data.result[0]['mentor']; 

      })*/

     // this.list=this.Userservice.mentorlist;
  }

}

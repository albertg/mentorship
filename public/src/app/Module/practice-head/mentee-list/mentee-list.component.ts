import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';

import { MenteeListService } from './mentee-list.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-mentee-list',
  templateUrl: './mentee-list.component.html',
  styleUrls: ['./mentee-list.component.css']
})
export class MenteeListComponent implements OnInit {
  @Input()
  menteelists:string;
  @Input()
  mentorlist:string;
  mid;
  searchText;
  @Output() refreshdata = new EventEmitter();

  constructor(private api: MenteeListService,
    private Userservice: UserserviceService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }
 
  ngOnInit() { //this.Userservice.userid
  

  }
  redirect(id){

    this.router.navigate(['menteeinfo/'+id]);
  }
 
  getmid(id){
    this.mid=id;

  }

  refreshchaild(){
    this.refreshdata.emit();

   // /api/employee/:userId/promote/mentor
  }
  promote(values){
      if (values.currentTarget.checked == true) {
        this.api.promotementor(values.target.defaultValue).subscribe(data => {
          if(data.result=='success'){
            this.refreshchaild();
            this.toastr.success('success', 'success');
          }
          else{
            this.toastr.error('error', 'error');
          }
        });
      }
    }
}
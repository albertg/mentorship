import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AssignMenteeService } from './assign-mentee.service';
import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-mentee',
  templateUrl: './assign-mentee.component.html',
  styleUrls: ['./assign-mentee.component.css']
})
export class AssignMenteeComponent implements OnInit {

  selectedlist = [];
  mentees;
  @Output() mentorlist = new EventEmitter();
  @Input()
  mentorid:any;
  showerror=false;
  searchText;
  constructor(private api: AssignMenteeService,
    private Userservice: UserserviceService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }
  //api/employee/ph/12/assigned
  ngOnInit() {
    this.showerror=false;
    this.employee();
  }
  employee() {
    this.api.getemployee(this.Userservice.practiceId).subscribe(data => {

      this.mentees = data;
        if(data.length==0){
          this.showerror=true;
          console.log(data.length);
        }
        else{
          this.showerror=false;
        }

    });
  }
  addmentee() {
    console.log(this.selectedlist);
    //alert(values);
    this.api.updatementee(this.mentorid,this.selectedlist).subscribe(data => {
      if(data.result=='success'){
        this.mentorlist.emit();
        this.employee();
        this.selectedlist = [];
        this.toastr.success('success', 'success');
      }
      else{
        this.toastr.error('error', 'error');
      }
    });
  
   
  }

  changeevent(values) {
    if (values.currentTarget.checked == true) {
      this.selectedlist.push(values.target.defaultValue);
    }
    else {
      let i = this.selectedlist.indexOf(values.target.defaultValue);
      this.selectedlist.splice(i, 1)
     // console.log(' removed'+);
    }
  }
}

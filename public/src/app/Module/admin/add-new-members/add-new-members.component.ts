import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {AddNewMembersService} from './add-new-members.service';
import { UserserviceService } from '../../../_service/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { visitAll } from '@angular/compiler';

@Component({
  selector: 'app-add-new-members',
  templateUrl: './add-new-members.component.html',
  styleUrls: ['./add-new-members.component.css']
})
export class AddNewMembersComponent implements OnInit {

  searchText;
  unassindmembers;
  selectedlist = [];
  hidecontent=false;
  @Output() refreshdata = new EventEmitter();
  @Input()
  practicid:any;
   showerror=false;
  constructor(private api:AddNewMembersService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private Userservice:UserserviceService,) { }

  ngOnInit() {
    this.getmembers();
    this.showerror=false;
  }
  getmembers(){
    this.api.getallmembers().subscribe(data => {
    this.unassindmembers=data;
    if(data.length==0){
      this.showerror=true;
      this.hidecontent=true;
    }
    else{
      this.hidecontent=true
      this.showerror=false;
    }
            })
  }

  addmember() {
    this.api.updatemember(this.practicid,this.selectedlist).subscribe(data => {
      if(data.status=='success'){
        this.refreshdata.emit();
        this.getmembers();
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {AddNewPracticeHeadService} from './add-new-practice-head.service'
import { UserserviceService } from '../../../_service/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { visitAll } from '@angular/compiler';

@Component({
  selector: 'app-add-new-practice-head',
  templateUrl: './add-new-practice-head.component.html',
  styleUrls: ['./add-new-practice-head.component.css']
})
export class AddNewPracticeHeadComponent implements OnInit {

  unassindmembers;
  selectedlist = [];
  searchText;
  @Output() refreshdata = new EventEmitter();
  @Input()
  practicid:any;
   showerror=false;
  constructor(private api:AddNewPracticeHeadService,
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
     }
     else{
       this.showerror=false;
     }

    });

  }

  practiceead() {
    //console.log(this.practicid+this.selectedlist);
 
   // console.log(this.selectedlist+'-------' +this.menteeid+alphas);
    this.api.updatepracticeead(this.practicid,this.selectedlist).subscribe(data => {
      if(data.status=='success'){
        this.refreshdata.emit();
        this.getmembers();
        this.toastr.success('success', 'success');
      }
      else{
        this.toastr.error('error', 'error');
      }
    });

  }

  changeevent(values) {
this.selectedlist=values;

  }
}


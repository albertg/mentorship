import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import { UserserviceService } from '../../../_service/userservice.service';

import * as $ from 'jquery';

import { AssignMentorService } from './assign-mentor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-mentor',
  templateUrl: './assign-mentor.component.html',
  styleUrls: ['./assign-mentor.component.css']
})
export class AssignMentorComponent implements OnInit {
  
  @Input()
  assmentorlist:string;
  @Output() refreshdata = new EventEmitter();
  selectedlist;
  @Input()
  menteeid:any;
  searchText;
  constructor(private api: AssignMentorService,
    private Userservice: UserserviceService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }
  
  ngOnInit() { //this.Userservice.userid
  //  console.log(this.assmentorlist);
  }
  addmentor() {
    var id= [];
id.push(this.menteeid);
   // console.log(this.selectedlist+'-------' +this.menteeid+alphas);
    this.api.updatementor(this.selectedlist,id).subscribe(data => {
      if(data.result=='success'){
        this.refreshdata.emit();
        this.toastr.success('success', 'success');
      }
      else{
        this.toastr.error('error', 'error');
      }
    });
    //updatementee
  }

  changeevent(values) {
this.selectedlist=values;

  }

}

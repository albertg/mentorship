import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ActionsService } from './actions.service';

import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from '../../../_service/userservice.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
  // animations: [

  //   trigger('myAwesomeAnimation', [
  //     state('small', style({
  //         transform: 'scale(1)',
  //     })),
  //     state('large', style({
  //         transform: 'scale(1.2)',
  //     })),
  // ]),

  //  ]
})
export class ActionsComponent implements OnInit {

  @Input() actionList;
  @Input() goalid: number;
  @Output() refresh = new EventEmitter();

  @Output() trigeractions = new EventEmitter();
  list;
  userrole;
  state: string = 'small';
  showerror;
  constructor(private api: ActionsService,
    private Userservice: UserserviceService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userrole = this.Userservice.role;
    if(this.actionList==0){
      this.showerror=true;
    }
    else{
      this.showerror=false;
    }
    //
  }
  action(value) {
    let body = {
      "description": value.discussiontopic,
      "mentor": this.Userservice.userid,
      "status": 1
    };
    this.api.postactions([body], this.goalid).subscribe(data => {

      if (data.status == 'success') {
        this.refresh.emit();
        this.getactionsdata();
        this.toastr.success('success', 'success');
      }
      else {
        this.toastr.error('error', 'error');
      }
    });
  }

  getactionsdata() {
    this.api.getactions(this.goalid).subscribe(data => {
      this.actionList = data;
    });
  }
  changeStatus(actionId, statusId) {
    this.api.updateactions(actionId, statusId).subscribe(data => {
      if (data.status == 'success') {
        this.getactionsdata();
        this.refresh.emit();
        this.toastr.success('success', 'success');
      }
      else {
        this.toastr.error('error', 'error');
      }

    });

  }

  showaction(i) {
    // $('.drop-down').hide();
    $("#drop-" + i).slideToggle();
  }


}

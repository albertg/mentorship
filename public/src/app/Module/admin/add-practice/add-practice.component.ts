import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

import {AddPracticeService} from './add-practice.service';
import { UserserviceService } from '../../../_service/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { visitAll } from '@angular/compiler';


@Component({
  selector: 'app-add-practice',
  templateUrl: './add-practice.component.html',
  styleUrls: ['./add-practice.component.css']
})
export class AddPracticeComponent implements OnInit {
  @Output() refreshdata = new EventEmitter();
  constructor(private api:AddPracticeService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private Userservice:UserserviceService,) { }

  ngOnInit() {
  }

  addPractice(value){
    let body = {
      "name":value.practicetopic,
    };

    this.api.addpractice(body).subscribe(data => {
      if (data.status == 'success') {
        this.refreshdata.emit();
        this.toastr.success('success', 'success');
      }
      else {
        this.toastr.error('error', 'error');
      }
            })
  }




}

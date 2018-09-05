
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// Custom  Module
import { AppComponent } from './app.component';
import { AdminModule } from './Module/admin/admin.module';
import { PracticeHeadModule } from './Module/practice-head/practice-head.module';
import { LandingModule } from './Module/landing/landing.module';
import { UserModule } from './Module/user/user.module';
import { MentorModule } from './Module/mentor/mentor.module';
import { MenteeModule } from './Module/mentee/mentee.module';
import { UserserviceService } from './_service/userservice.service';
import { ActionService } from './_service/action.service';
import { AuthguardGuard } from './guards/authguard.guard';
import { PageErrorModule } from './Module/page-error/page-error.module';




  @NgModule({
declarations: [AppComponent,
],
    imports: [BrowserModule,
      LandingModule,
      AdminModule,
      PageErrorModule,
      PracticeHeadModule,
      UserModule,
      MentorModule,
      MenteeModule,
      HttpClientModule,
      FormsModule,
      RouterModule,
      Ng2GoogleChartsModule,
      PracticeHeadModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
      closeButton:true,
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      progressBar:true,
      progressAnimation:'decreasing'
      }),
  ], 
    bootstrap: [AppComponent],
    providers:[UserserviceService,AuthguardGuard,ActionService],

  })
  export class AppModule { }
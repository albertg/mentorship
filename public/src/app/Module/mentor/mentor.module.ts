import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyMenteeComponent } from './my-mentee/my-mentee.component';
import { MenteeDetailsComponent } from './mentee-details/mentee-details.component';
import { MentorRoutingModule } from './mentor-routing.module';
import {MymenteeService} from './my-mentee/mymentee.service';
import {MenteeDetailsService} from './mentee-details/mentee-details.service';
import { GoalsComponent } from './goals/goals.component';
import { GoalsService } from './goals/goals.service';


import { MainHeaderModule } from '../Shared/main-header/main-header.module';
import { PerformanceProgressModule } from '../Shared/performance-progress/performance-progress.module';
import { AllPipeModule } from '../../Pipe/all-pipe.module';
import { SharedModuleModule } from '../Shared/shared-module.module';
import { ApprovalComponent } from './approval/approval.component';
import { ApprovalService } from './approval/approval.service';
import { PageErrorModule } from '../page-error/page-error.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MentorRoutingModule,
    MainHeaderModule,
    PerformanceProgressModule,
    AllPipeModule,
    SharedModuleModule,
    PageErrorModule
  ],
  providers: [
    MymenteeService,
    MenteeDetailsService,
    GoalsService,
    ApprovalService
   // ActionsService
  ],
  declarations: [
    //HeaderComponent,
  MyMenteeComponent,
    //ActionsComponent,
    MenteeDetailsComponent, 
    GoalsComponent, ApprovalComponent
   /* CountPipe,
    EmfilterPipe,
    MentornamePipe,
    GetLengthPipe,
    DateFormatPipe,
    LowercasePipe,
    OrderPipe,
    PercentagePipe,
  KeyandvaluePipe*/]
})
export class MentorModule { }

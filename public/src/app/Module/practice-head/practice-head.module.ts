import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { AssignMenteeComponent } from './assign-mentee/assign-mentee.component';
import { AssignMentorComponent } from './assign-mentor/assign-mentor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PracticeheadrRoutingModule } from './practice-head-routing.module';
import { MainHeaderModule } from '../Shared/main-header/main-header.module';
import { PerformanceProgressModule } from '../Shared/performance-progress/performance-progress.module';
import { AllPipeModule } from '../../Pipe/all-pipe.module';
import { DashboardService } from './dashboard/dashboard.service';
import { AssignMenteeService } from './assign-mentee/assign-mentee.service';
import { AssignMentorService } from './assign-mentor/assign-mentor.service';
import { SharedModuleModule } from '../Shared/shared-module.module';
import { MenteeListService } from './mentee-list/mentee-list.service';
import { PageErrorModule } from '../page-error/page-error.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PracticeheadrRoutingModule,
    MainHeaderModule,
    PerformanceProgressModule,
    AllPipeModule,
    SharedModuleModule,
    PageErrorModule
  ],
  providers: [DashboardService,AssignMenteeService,AssignMentorService,
    MenteeListService],
  declarations: [MenteeListComponent, MentorListComponent, AssignMenteeComponent, AssignMentorComponent, DashboardComponent],
  
})
export class PracticeHeadModule { }

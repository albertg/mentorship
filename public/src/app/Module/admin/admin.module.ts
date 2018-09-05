import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AdminRoutingModule } from './admin-routing.module';
import { MainHeaderModule } from '../Shared/main-header/main-header.module';
import { PerformanceProgressModule } from '../Shared/performance-progress/performance-progress.module';
import { AllPipeModule } from '../../Pipe/all-pipe.module';
import { SharedModuleModule } from '../Shared/shared-module.module';


import { PracticeListComponent } from './practice-list/practice-list.component';
import { PracticeListService } from './practice-list/practice-list.service';
import { AddPracticeComponent } from './add-practice/add-practice.component';
import { AddPracticeService } from './add-practice/add-practice.service';
import { AddNewPracticeHeadComponent } from './add-new-practice-head/add-new-practice-head.component';
import { AddNewMembersComponent } from './add-new-members/add-new-members.component';
import { AddNewMembersService } from './add-new-members/add-new-members.service';
import { AddNewPracticeHeadService } from './add-new-practice-head/add-new-practice-head.service';
import { PracticeComponent } from './practice/practice.component';
import { PracticeService } from './practice/practice.service';
import { PageErrorModule } from '../page-error/page-error.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MainHeaderModule,
    PerformanceProgressModule,
    AllPipeModule,
    SharedModuleModule,
    PageErrorModule
  ],
  providers: [PracticeListService,AddPracticeService,
    AddNewMembersService,
    AddNewPracticeHeadService,
    PracticeService
  ],
  declarations: [PracticeListComponent, AddPracticeComponent, AddNewPracticeHeadComponent, AddNewMembersComponent, PracticeComponent]
})
export class AdminModule { }

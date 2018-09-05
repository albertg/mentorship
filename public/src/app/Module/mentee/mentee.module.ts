import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//MenteeRoutingModule
import { MyMentorComponent } from './my-mentor/my-mentor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenteeRoutingModule } from './mentee-routing.module';
import { MymentorService } from './my-mentor/mymentor.service';
import { MainHeaderModule } from '../Shared/main-header/main-header.module';
import { PerformanceProgressModule } from '../Shared/performance-progress/performance-progress.module';
import { MenteeDetailsService } from '../mentor/mentee-details/mentee-details.service';
import { AllPipeModule } from '../../Pipe/all-pipe.module';
import { MenteedashboardService } from './dashboard/menteedashboard.service';
/* import { DiscussionsComponent } from '../Shered/discussions/discussions.component';
import { DiscussionsService } from '../Shered/discussions/discussions.service';
 */
import { SharedModuleModule } from '../Shared/shared-module.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MenteeRoutingModule,
    MainHeaderModule,
    PerformanceProgressModule,
    AllPipeModule,
    SharedModuleModule
  ],
  declarations: [MyMentorComponent,DashboardComponent, /* DiscussionsComponent, */
    
    ],
  providers: [MymentorService,MenteeDetailsService,MenteedashboardService,
   // DiscussionsService,
]
})
export class MenteeModule { }

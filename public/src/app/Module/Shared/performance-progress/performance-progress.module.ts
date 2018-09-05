import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceProgressComponent } from './pro1/performance-progress.component';
import { AllPipeModule } from '../../../Pipe/all-pipe.module';
import { Pro2Component } from './pro2/pro2.component';

@NgModule({
  imports: [CommonModule,AllPipeModule],
  declarations: [PerformanceProgressComponent, Pro2Component],
  exports: [PerformanceProgressComponent,Pro2Component]
})
export class PerformanceProgressModule { }

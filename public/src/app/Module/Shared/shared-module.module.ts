import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { ActionsService } from './actions/actions.service';
import { DiscussionsComponent } from './discussions/discussions.component';
import { DiscussionsService } from './discussions/discussions.service';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { PerformanceProgressModule } from './performance-progress/performance-progress.module';
import { AllPipeModule } from '../../Pipe/all-pipe.module';
import { MessagesComponent } from './messages/messages.component';
import { PageErrorModule } from '../page-error/page-error.module';

@NgModule({
  imports: [BrowserAnimationsModule,PageErrorModule,
    CommonModule,BrowserModule,FormsModule,PerformanceProgressModule,AllPipeModule],
  declarations: [ActionsComponent,DiscussionsComponent,TopPanelComponent, MessagesComponent],
  providers: [ActionsService,DiscussionsService],
  exports: [ActionsComponent,DiscussionsComponent,TopPanelComponent]
})
export class SharedModuleModule { }

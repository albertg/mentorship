import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AllPipeModule } from '../../../Pipe/all-pipe.module';


@NgModule({
  imports: [CommonModule,AllPipeModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class MainHeaderModule { }

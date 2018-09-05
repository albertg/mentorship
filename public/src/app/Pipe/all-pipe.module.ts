import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountPipe } from './../Pipe/count/count.pipe';
import { MentornamePipe } from './../Pipe/mentor-name/mentorname.pipe';
import { KeyandvaluePipe } from './../Pipe/keyandvalue/keyandvalue.pipe';
import { PercentagePipe } from './../Pipe/percentage/percentage.pipe';
import { EmfilterPipe } from './../Pipe/emfilter/emfilter.pipe';

import { GetLengthPipe } from './../Pipe/get-length/get-length.pipe';
import { LowercasePipe } from './../Pipe/lowercase/lowercase.pipe';
import { OrderPipe } from './../Pipe/order/order.pipe';
import { DateFormatPipe } from './../Pipe/date-format/date-format.pipe';
import { ToCapitalizePipe } from './capitalize/to-capitalize.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ CountPipe ,MentornamePipe,OrderPipe,
    DateFormatPipe,
    KeyandvaluePipe,PercentagePipe,EmfilterPipe,GetLengthPipe,LowercasePipe,
    ToCapitalizePipe
  ],
  exports: [ CountPipe ,MentornamePipe,OrderPipe,
    DateFormatPipe,
    ToCapitalizePipe,
    KeyandvaluePipe,PercentagePipe,EmfilterPipe,GetLengthPipe,LowercasePipe ]
})
export class AllPipeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PageErrorModule } from '../page-error/page-error.module';

@NgModule({
  imports: [
    CommonModule,
    PageErrorModule
  ],
  declarations: [MyProfileComponent]
})
export class UserModule { }

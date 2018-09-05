import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './login/login.service';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,

  ],
  imports: [CommonModule, FormsModule,LandingRoutingModule,HttpClientModule],
  providers: [LoginService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LandingModule { }

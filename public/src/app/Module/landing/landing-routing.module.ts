import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const landingRout: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'home#section-1',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(landingRout)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}

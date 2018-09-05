import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { AuthguardGuard } from '../../guards/authguard.guard';

const productRoutes: Routes = [
  {
    path: 'practicehead/:id',
    component: DashboardComponent,
    canActivate:[AuthguardGuard]
   // canActivate:[AuthguardGuard]
    /*children: [
      { path: ':mentor', component: MentorListComponent },
      { path: ':mentee', component: MenteeListComponent }
      
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class PracticeheadrRoutingModule {}

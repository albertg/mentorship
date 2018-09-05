import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyMentorComponent } from './my-mentor/my-mentor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from '../../guards/authguard.guard';

const productRoutes: Routes = [
  {
    path: 'mentee/:id',
    component: DashboardComponent,
    canActivate:[AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class MenteeRoutingModule {}

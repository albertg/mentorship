import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyMenteeComponent } from './my-mentee/my-mentee.component';
import { MenteeDetailsComponent } from './mentee-details/mentee-details.component';
import { AuthguardGuard } from '../../guards/authguard.guard';

const mentorRoutes: Routes = [
  {
    path: 'mentor/:id',
    component: MyMenteeComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path: 'menteeinfo/:id',
    component: MenteeDetailsComponent,
    canActivate:[AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(mentorRoutes)],
  exports: [RouterModule]
})
export class MentorRoutingModule {}

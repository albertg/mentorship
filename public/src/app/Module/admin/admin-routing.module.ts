import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticeListComponent } from './practice-list/practice-list.component';
import { PracticeComponent } from './practice/practice.component';
import { AuthguardGuard } from '../../guards/authguard.guard';


const adminroot: Routes = [
  {
    path: 'admin/:id',
    component: PracticeListComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path: 'practice/:title/:id',
    component: PracticeComponent,
    canActivate:[AuthguardGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(adminroot)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

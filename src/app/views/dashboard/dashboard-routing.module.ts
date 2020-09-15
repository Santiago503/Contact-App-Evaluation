import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [

  {
    path: '',
    data: {
      title: 'DashBoard'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      }, 
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'DashBoard'
        }
      },
      
    
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

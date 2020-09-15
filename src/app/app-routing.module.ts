import { createComponent } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { P404Component } from './views/component/p404/p404.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('./views/contact/contact.module').then(m => m.ContactModule)
      },
    ]
  },
  {
    path: '**',
    component: P404Component,
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

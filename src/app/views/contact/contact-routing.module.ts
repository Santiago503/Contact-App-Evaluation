import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContactComponent } from './list-contact/list-contact.component';
import { CreateUpdateContactComponent } from './create-update-contact/create-update-contact.component';


const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Contactos'
    },
    children: [
      {
        path: '',
        redirectTo: 'list-contact'
      }, 
      {
        path: 'list-contact',
        component: ListContactComponent,
        data: {
          title: 'Listado de Contacto'
        }
      },
      {
        path: 'create-contact',
        component: CreateUpdateContactComponent,
        data: {
          title: 'Crear Contacto'
        }
      },
      {
        path: 'edit-contact',
        component: CreateUpdateContactComponent,
        data: {
          title: 'Editar Contacto'
        }
      },
    
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }

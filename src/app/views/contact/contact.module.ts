import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ListContactComponent } from './list-contact/list-contact.component';
import { CreateUpdateContactComponent } from './create-update-contact/create-update-contact.component';


@NgModule({
  declarations: [ListContactComponent, CreateUpdateContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ListContactComponent } from './list-contact/list-contact.component';
import { CreateUpdateContactComponent } from './create-update-contact/create-update-contact.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [ListContactComponent, CreateUpdateContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MaterialModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContactModule { }

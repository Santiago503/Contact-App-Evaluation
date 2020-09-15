import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactInterface } from  '../../../model/contact';
import { ContactService } from  '../../../service/contact/contact.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {


  dataContact: ContactInterface[];
  title: string;
  
  
  constructor(public contactService: ContactService,private route: ActivatedRoute) {
    this.title = route.snapshot.data['title'];
    this.dataContact = this.contactService.ContactStorage;
   }

  ngOnInit(): void {
    this.contactService.getContacts();
  }



  editContact(resourceForm: any) {
      this.contactService.OnPreEdit(resourceForm);
  }

  deleteContact(Contact) {
    Swal.fire({
      title: 'Estas Seguro que desea Eliminar este Contacto?',
      text: "Todos los datos de este Contacto se perderan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.contactService.deleteContact(Contact);
      }
    })
    
  

  }


}

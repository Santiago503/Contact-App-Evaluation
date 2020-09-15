import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactInterface } from  '../../../model/contact';
import { ContactService } from  '../../../service/contact/contact.service';


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



  deleteContact(Contact) {
    this.contactService.deleteContact(Contact);
  }
  

  editContact(resourceForm: any) {
      this.contactService.OnPreEdit(resourceForm);
  }


}

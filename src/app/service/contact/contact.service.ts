import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactInterface } from 'src/app/model/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  ContactStorage: any[];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  // data archiv json
  public getDataContactArchivJson() {

    return this.http.get("../../../assets/data/dataContactInit.json")
    .subscribe(
      (resp : ContactInterface[]) => {

        this.ContactStorage = resp;
        console.log(resp)
      }

    )

  }

  getContacts() {
    if(localStorage.getItem('Contacts') === null) {

      this.getDataContactArchivJson();

    } else {

      this.ContactStorage = JSON.parse(localStorage.getItem('Contacts'));
      
    }
    return this.ContactStorage;
  }

  addContact(ContactForm: ContactInterface) {
    this.ContactStorage.push(ContactForm);
    let Contacts = [];
    if(localStorage.getItem('Contacts') === null) { //sto es null

      Contacts = [];
      Contacts.push(ContactForm);
      localStorage.setItem('Contacts', JSON.stringify(Contacts));

    } else {

      Contacts = JSON.parse(localStorage.getItem('Contacts'));
      Contacts.push(ContactForm); 
      localStorage.setItem('Contacts', JSON.stringify(Contacts));

    }
  }


  deleteContact(Contact) {

      for (let i = 0; i < this.ContactStorage.length; i++) {
      if (Contact == this.ContactStorage[i]) {
        this.ContactStorage.splice(i, 1);
        localStorage.setItem('Contacts', JSON.stringify(this.ContactStorage));
      }
    }

  }

  OnPreEdit(Contact) {

    for (let i = 0; i < this.ContactStorage.length; i++) {
    if (Contact == this.ContactStorage[i]) {
      this.router.navigateByUrl(`/contacts/create-contact/${Contact.idcontact}`);
      console.log(this.ContactStorage[i]);

      // this.ContactStorage.splice(i, 1);
      // localStorage.setItem('Contacts', JSON.stringify(this.ContactStorage));
    }
  }

}


}


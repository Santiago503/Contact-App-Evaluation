import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ContactInterface } from 'src/app/model/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  Contacts: ContactInterface[];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  // Form
  contactForm  = this.fb.group({

    fullName:     ['', Validators.required],
    email:        ['', Validators.email],
    infoContact:  [''],
    mobiles:      this.fb.array([
                    this.createItemMobiles()
                  ])

  });

  addItemMobiles(): void {

    (<FormArray>this.contactForm.get("mobiles")).push( this.createItemMobiles()  );

  }

  createItemMobiles() {
    return this.fb.group({
      mobiles: ['', Validators.required]
    });
  }
  // End Form




  // data archiv json
  public getDataContactArchivJson() {

    return this.http.get("../../../assets/data/dataContactInit.json")
    .subscribe(
      (resp : ContactInterface[]) => {

        this.Contacts = resp;
        console.log(resp)
      }

    )

  }


  getContacts() {
    if(localStorage.getItem('Contacts') === null) {

      this.getDataContactArchivJson();

    } else {

      this.Contacts = JSON.parse(localStorage.getItem('Contacts'));
      
    }
    return this.Contacts;
  }

  // addTask(Contact: ContactInterface) {
  //   this.Contacts.push(Contact);
  //   let Contacts = [];
  //   if(localStorage.getItem('Contacts') === null) {
  //     Contacts = [];
  //     Contacts.push(Contact);
  //     localStorage.setItem('Contacts', JSON.stringify(Contacts));
  //   } else {
  //     Contacts = JSON.parse(localStorage.getItem('Contacts'));
  //     Contacts.push(Contact); 
  //     localStorage.setItem('Contacts', JSON.stringify(Contacts));
  //   }
  // }

  // deleteTask(Contact: ContactInterface) {

  //   for (let i = 0; i < this.Contacts.length; i++) {
  //     if (Contact == this.Contacts[i]) {
  //       this.Contacts.splice(i, 1);
  //       localStorage.setItem('Contacts', JSON.stringify(this.Contacts));
  //     }
  //   }

  // }



}


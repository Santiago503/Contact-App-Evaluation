import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/service/contact/contact.service';
import Swal from 'sweetalert2';
import uid from 'uid';
@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.css']
})
export class CreateUpdateContactComponent implements OnInit {
  title: string;
  
  
  constructor(public contactService: ContactService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
              
               this.title = route.snapshot.data['title'];
    
   }

  ngOnInit(): void {
  }

    // Form
    contactForm  = this.fb.group({
      idcontact:    [0],
      fullName:     ['Francisco', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      email:        ['fran@gmai.com', [ Validators.required,Validators.email]],
      infoContact:  ['adfasdf'],
      mobiles:      this.fb.array([
                      this.fb.control('asdfadf', Validators.required)
                    ])
  
    });
  
  get GetMobiles() {
  
    return this.contactForm.get("mobiles") as FormArray;
  
  }
  
  addMobiles() {
      this.GetMobiles.push(this.fb.control('', Validators.required));
  }
  // End Form


 // Validators

  ValidateForm(){
    if(this.contactForm.invalid){

      Swal.fire({
        title: 'Error!',
        text: 'Datos invalidos',
        icon: 'error',
        timer: 1500
      });
      return;

    }else{
      this.CreateUpdateContact();
    }
  }

  CampNotValid(campo : string) : boolean{

    if( this.contactForm.get(campo).invalid 
    && this.contactForm.get(campo).touched) {
      return true;
    }else {
      false;
    }

  }

  CampMaxLenght(campo : string, num:number) : boolean{
    if( this.contactForm.get(campo).value?.length > num && this.contactForm.get(campo).invalid ) {
      return true;
    }else {
      false;
    }
  }

  CampRequired(campo : string) : boolean{

    if( !this.contactForm.get(campo).value && this.contactForm.get(campo).touched ) {

      return true;

    }else {

      false;

    }
  }

 // End Validators

 
  CreateUpdateContact() {

    if(this.contactForm.value.id == 0 || this.contactForm.value.id == undefined || this.contactForm.value.id == null){

      this.contactForm.value.idcontact = uid(6); //Asign Id
      this.contactService.addContact(this.contactForm.value);
      this.clearContact();

    }else{


    }
  }


  clearContact() {
   this.contactForm.reset();
  }

}

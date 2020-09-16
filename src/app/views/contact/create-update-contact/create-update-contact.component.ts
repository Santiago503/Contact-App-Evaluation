import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactInterface } from 'src/app/model/contact';
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
              private fb: FormBuilder,
              private router:Router) {
                this.title = route.snapshot.data['title'];
                
              }
              
  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.findContact(params.idcontact)
      }
    );

  }
    // Form
  contactForm = this.fb.group({
      idcontact:    [0],
      fullName:     ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA -Z]+$')]],
      email:        ['', [ Validators.required,Validators.email]],
      infoContact:  [''],
      mobiles:      this.fb.array([
                      this.fb.control('', Validators.required)
                    ])
  
    });
  
  get GetMobiles() {
  
    return this.contactForm.get("mobiles") as FormArray;
  
  }
  
  addMobiles(valor = '') {
      this.GetMobiles.push(this.fb.control(valor, Validators.required));
  }

  removeItemMobiles(index: number, click) {
    if(this.GetMobiles.length > 1 || click == null){
      this.GetMobiles.removeAt(index);
    }
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

    if(this.contactForm.value.idcontact == 0 || this.contactForm.value.idcontact == undefined || this.contactForm.value.idcontact == null){
      console.log(this.contactForm.value.id);
      this.contactForm.value.idcontact = uid(6); //Asign Id
      this.contactService.addContact(this.contactForm.value);
      this.clearContact();
      this.router.navigate(['/contacts/list-contact'])

    }else{
      console.log(this.contactForm.value);
      this.contactService.updateContact(this.contactForm.value);
      this.clearContact();
      this.router.navigate(['/contacts/list-contact'])

    }

  }


  clearContact() {
   this.contactForm.reset();
  }


  findContact(idcontact : string){
    this.contactService.getContacts();
    let Datos = this.contactService.ContactStorage;

    if  (idcontact != '' && Datos != null) {
      for (let i = 0; i < Datos.length; i++) {
        if (idcontact == Datos[i].idcontact) {
          console.log(Datos[i])
          this.clearContact();
          this.contactForm.patchValue(Datos[i]);

          if( Datos[i].mobiles.length > 1){
            
            this.removeItemMobiles(0,null);
            Datos[i].mobiles.forEach((x) => {
              this.addMobiles(x);
            });

          }

        }
      }
    }
  }



}

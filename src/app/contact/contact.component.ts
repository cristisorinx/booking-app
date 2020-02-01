import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetUpdateService } from '../shared/get-update.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  displayed = false;
  problemsType = ['Account', 'Registration', 'Application', 'Other'];
  contactForm: FormGroup;
  error: string = null;
  message: string = null;

  constructor(private getUpdate: GetUpdateService) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
        'userData': new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'universityData': new FormGroup({
        'university': new FormControl(null, Validators.required),
        'unicNumber': new FormControl(null, Validators.required),
        'problemType': new FormControl(null)
      }),
      'problem': new FormControl(null, Validators.required),
      'agreed': new FormControl(null, Validators.required)
    });

  }

  onSubmit(){

   this.getUpdate.registerProblem(this.contactForm)
     .subscribe( respData => {
        console.log(respData);
      },
      error => {
        this.error = error.message;
        console.log(error);
      },
      () => {
        this.message = 'Your message has been send . We\'ll try to respond or resolve your problem as soon as we can. Thank you !';
        this.contactForm.reset();
      });

  }

  displayTerms(){
    this.displayed = !this.displayed;
  }
}

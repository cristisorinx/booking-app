import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { GetUpdateService } from '../shared/get-update.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  display = false;
  alreadyRegistred = false;
  isValid = false;
  @ViewChild('f') registerForm: NgForm;
  error: string = null;
  id: string = null;
  usNumber = '';

  constructor(private authService: AuthService,
              private router: Router,
              private getData: GetUpdateService,
              private updateData: GetUpdateService) {}

  ngOnInit() {
    this.error = '';
  }

  displayTerms() {
    this.display = !this.display;
  }

  verifyPwd() {
    if (this.registerForm.value.password === this.registerForm.value.confirmedPassword) {
      this.error = null;
      return true;
    } else {
      this.error = 'The passwords are not the same !';
      return false;
    }
  }

  onCheck(event) {

    if (event.target.checked ===  true) {
      this.validate();
    } else {
      this.alreadyRegistred = false;
    }
  }

  validate() {
    this.getData.getStudents()
    .subscribe(reg => {
      // tslint:disable-next-line: forin
      for (const key in reg) {
        if (reg[key].usNumber === this.registerForm.value.usNumber) {
          if (reg[key].registred === false ) {
            this.isValid = true;
            this.alreadyRegistred = false;
            this.id = reg[key].id;
          } else { this.alreadyRegistred = true; }
        } else {
          this.error = 'This serial number doesn\'t exist';
        }
      }
    },
    error => {
      this.error = error.message;
    }
  );
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    if (this.verifyPwd() && this.isValid) {
        this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password)
        .subscribe(() => {
          this.isValid = false;
          this.router.navigate(['/login']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        },
        () => {
          this.updateData.registerUserData(this.registerForm)
          .subscribe(() => {
            this.registerForm.reset();
            }
          );
          this.updateData.updatePrimaryDb(this.id).subscribe();
        }
        );
    }
  }

}

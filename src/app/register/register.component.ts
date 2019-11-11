import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Student } from 'src/app/shared/dbStudent.model';
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
  isValid :boolean = false;
  @ViewChild('f',{static: false}) registerForm: NgForm;
  error: string = null;
  id:string = null;

  constructor(private httpGet: HttpClient,
      private httpPost: HttpClient,
      private authService: AuthService,
      private router: Router,
      private getData: GetUpdateService,
      private updateData: GetUpdateService) {}

  ngOnInit() {
  }

  displayTerms(){
    this.display = !this.display;
  }
  
  verifyPwd(){
    if(this.registerForm.value.password === this.registerForm.value.confirmedPassword){
      this.error = null;
      return true;
    }
    else{
      this.error = "The passwords are not the same !"
      return false;
    }
  }

  onCheck(event){

    if(event.target.checked ===  true)
      this.validate();   
    else
      this.alreadyRegistred = false;
    
  }

  validate(){
    this.getData.getStudents()
    .subscribe(reg => {
      for(let key in reg){
        if(reg[key].usNumber === this.registerForm.value.usNumber){
          if(reg[key].registred === false){
            this.isValid = true;
            this.alreadyRegistred = false;
            this.id = reg[key].id;
          } else this.alreadyRegistred = true;
        }
      }
      if(!this.isValid)
        this.error = "This serial number does not exist .";
      else
        this.error = null;
    },
    error => {
      this.error = error.message;
    }
  );
  }

  onSubmit(){
    if(!this.registerForm.valid){
      return;
    }

    if(this.verifyPwd() && this.isValid){
     
        this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password)
        .subscribe(resp =>{
          this.isValid = false;
          this.router.navigate(['/login']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        },
        () => {
          this.updateData.registerUserData(this.registerForm)
          .subscribe(respData => {
          this.registerForm.reset();
          }
          );
          this.updateData.updatePrimaryDb(this.id).subscribe();
        }
        );
    } 
  }

}

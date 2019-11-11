import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { GetUpdateService } from '../shared/get-update.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  validSerialNumber = false;

  constructor(private authService: AuthService,
    private updateData: GetUpdateService) { }

  @ViewChild('authForm',{static: false}) form1: NgForm;
  ngOnInit() {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onUpdate(){
    // this.updateData.updatePrimaryDb().subscribe();
  }

  validate(){
    const usNumber = this.form1.value.usNumber;
    // this.authService.validateSerialNumber()
    // .subscribe(users =>{
    //   for(let key in users){
    //     console.log('user ' + users[key].usNumber);
        
    //     if(users[key].usNumber === usNumber){
    //       this.validSerialNumber = true;
    //     } else{
    //       this.validSerialNumber = false;
    //     }
    //   }
    //   console.log(users);
    // });
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const pwd = form.value.pwd;
    //const usNumber = form.value.usNumber;

    if(this.isLoginMode){
      // login code
    } else {
      console.log(this.validSerialNumber);
      if(this.validSerialNumber){
        this.authService.signUp(email,pwd);
      } else {
        alert('Failed to sign up !');
      }
    }
  
    form.reset();
  }
}

import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthRespData{
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registred?: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;
  noEmail = false;

  @ViewChild('logInForm',{static: false}) logInForm: NgForm;
  
  constructor(private httpPost: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {    
  }
 
  onSubmit(){

    if(!this.logInForm.valid){
      this.error = "Nice try ;) !";
      return;
    }

    const email = this.logInForm.value.email;
    const pwd = this.logInForm.value.password;

    this.authService.login(email,pwd)
    .subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/loggedIn']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    
  }

}

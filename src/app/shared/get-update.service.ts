import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './dbStudent.model';
import { map } from 'rxjs/operators';
import { NgForm, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GetUpdateService {

  sudentArray: Student [] = [];

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get<{[key: string]: Student}>(
      'https://booking-app-11aa6.firebaseio.com/primaryDb.json')
      .pipe(map(respData =>{
      const regArray: Student [] = [];

      // tslint:disable-next-line: forin
      for ( const key in respData){
        regArray.push({...respData[key] , id: key});
      }

      return regArray;
      })
    )
  }

  registerUserData(registerForm: NgForm){
    return this.http.post(
      'https://booking-app-11aa6.firebaseio.com/registredUsers.json',
      registerForm.value
      );
  }

  updatePrimaryDb(key: string){
    return this.http.patch('https://booking-app-11aa6.firebaseio.com/primaryDb/'+key+'.json',{
      "registred": true
    });
  }

  updateStudentData(key: string, data: FormGroup){
    return this.http.patch('https://booking-app-11aa6.firebaseio.com/primaryDb/' + key + '.json', {
      "CNP": data.value.CNP,
      "age": data.value.age,
      "firstName": data.value.firstName,
      "lastName": data.value.lastName,
      "phoneNumber": data.value.phoneNumber
    });
  }

  getRegistredUsers(){
    return this.http.get('https://booking-app-11aa6.firebaseio.com/registredUsers.json')
      .pipe(map( respData => {
        const usersArray: any [] = [];
        // tslint:disable-next-line: forin
        for (const key in respData) {
          usersArray.push(respData[key]);
        }

        return usersArray;
      }
      ));
  }

  registerProblem(contactForm: FormGroup){
    return this.http.post(
      'https://booking-app-11aa6.firebaseio.com/problemsDb.json',contactForm.value);
  }

  getStudentDormInfo(studentDorm: string){
    return this.http.get('https://booking-app-11aa6.firebaseio.com/' + studentDorm + '.json')
    .pipe(map( respData => {
      // const dormInfo: any [] = [];
      // // tslint:disable-next-line: forin
      // for (const key in respData) {
      //   dormInfo.push(respData[key]);
      // }

      return respData;
    }));
  }

}

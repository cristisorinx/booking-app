import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/shared/dbStudent.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @ViewChild('reg',{static: false}) regForm: NgForm;
  private formInput: Student;
  private error = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  onSubmit(){
    this.formInput = this.regForm.value;
    console.log(this.formInput);

    this.http.post<Student>('https://booking-app-11aa6.firebaseio.com/primaryDb.json',this.formInput)
        .subscribe(respData =>{
          console.log(respData);
        },
        error =>{
          this.error = error;
          console.log(error);
          alert(error);
        })
    this.fetchData();
  }

  fetchData(){
    this.http.get<Student>(
      'https://booking-app-11aa6.firebaseio.com/primaryDb.json')
      .pipe(map(respData =>{
      const regArray: Student [] = [];
      for( const key in respData){
        regArray.push({ ...respData[key], id: key});
      }
      return regArray;
      })
    )
    .subscribe(reg => {
      console.log(reg);
      } 
    );
  }

}

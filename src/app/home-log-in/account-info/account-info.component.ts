import { Component, OnInit, ViewChild } from '@angular/core';
import { GetUpdateService } from 'src/app/shared/get-update.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  viewMode = true;
  private usNumber: string;
  infoForm: FormGroup;
  private id: string = null;

  constructor(private getData: GetUpdateService) { }

  ngOnInit() {
    
    this.infoForm = new FormGroup({
      
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'CNP': new FormControl(null),      
      'age': new FormControl(null),
      'phoneNumber': new FormControl(null),
      'studDorm': new FormControl({value: null ,disabled: true}),
      'serialNumber': new FormControl({value: null ,disabled: true})
    });
    
    this.getInfo();
  }
      
  

  onEdit(){
    this.viewMode = false;
  }

  onSave(){
    this.viewMode = true;
    //save data 

    this.getData.getStudents().subscribe(
      respData =>{
        for(let key in respData){
          if(respData[key].usNumber === this.usNumber)
          this.id = respData[key].id;
        }
      },error => {
        console.log(error);
      }, () => {
        this.getData.updateStudentData(this.id,this.infoForm).subscribe();
      }
    );
  }

  private getInfo(){
    this.getData.getRegistredUsers()
      .subscribe(respData => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      for(let key in respData){
        if(userData.email === respData[key].email)
          this.usNumber = respData[key].usNumber;
      }
    },error => {
      console.log(error);
    }
    ,() => {
      this.getData.getStudents().pipe(map( respData =>{
        for(let key in respData){
        if(respData[key].usNumber === this.usNumber)
            return respData[key];
        }
        }))
      .subscribe(respData => {
       this.infoForm.patchValue({
        firstName: respData.firstName,
        lastName: respData.lastName,
        CNP: respData.CNP,
        age: respData.age,
        phoneNumber: respData.phoneNumber,
        studDorm: respData.studentDorm,
        serialNumber: respData.usNumber
      });
        
      } 
    );
    }
  );
  }
}

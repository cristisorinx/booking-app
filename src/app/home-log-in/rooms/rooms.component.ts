import { Component, OnInit } from '@angular/core';
import { GetUpdateService } from 'src/app/shared/get-update.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  studDorm: String;
  private usNumber: string;

  constructor(private getData: GetUpdateService) { }

  ngOnInit() {
    this.getInfo();
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
       this.studDorm = respData.studentDorm;
      });
        
      } 
    );
    }

}

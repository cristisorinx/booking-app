import { Component, OnInit } from '@angular/core';
import { GetUpdateService } from 'src/app/shared/get-update.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  studDorm: string;
  private usNumber: string;

  floors: string [] = [];
  rooms: Array<Object> = [];
  dormInfo: Array<any> = [];
  firstFloor: Array<any> = [];

  constructor(private getData: GetUpdateService) { }

  ngOnInit() {
    this.getInfo();
  }

  private getInfo() {
    this.getData.getRegistredUsers()
      .subscribe(respData => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        for (const key in respData) {
          if (userData.email === respData[key].email) {
            this.usNumber = respData[key].usNumber;
          }
        }
      }, error => {
        console.log(error);
      }
      , () => {
        this.getData.getStudents().pipe(map( respData => {
          for (const key in respData) {
          if (respData[key].usNumber === this.usNumber) {
              return respData[key];
          }
          }
          }))
        .subscribe(respData => {
         this.studDorm = respData.studentDorm;
         this.getData.getStudentDormInfo(respData.studentDorm)
         // tslint:disable-next-line: no-shadowed-variable
         .subscribe(respData => {
           for (const floor in respData) { debugger
           
            this.floors.push(floor);
            this.rooms.push(respData[floor]);

            switch (floor) {
              case '1st Floor':
                console.log('entered in 1stfloor case');

                // tslint:disable-next-line: forin
                for (const i in respData[floor]) {
                  this.firstFloor.push(respData[floor][i]);
                }
                console.log(this.firstFloor);
                break;
              case '2nd Floor':
                console.log('entered in 2ndfloor case');
                break;
              case '3rd Floor':
                console.log('entered in 3rdfloor case');
                break;
              case '4th Floor':
                console.log('entered in 4thfloor case');
                break;
              case '5th Floor':
                console.log('entered in 5thfloor case');
                break;
            }
          }
          this.processRooms(respData);
         });
        });
        }
      );
    }

  private processRooms(respData: Object) {
     // tslint:disable-next-line: forin


      // tslint:disable-next-line: forin
    //  for (const i in this.rooms) {
    //     // tslint:disable-next-line: forin
    //     for (const j in this.rooms[i]) {
    //     // console.log(this.rooms[i][j]);
    //     }
    //   }
  }

}

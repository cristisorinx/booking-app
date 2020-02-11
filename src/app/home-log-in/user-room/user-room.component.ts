import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.css']
})
export class UserRoomComponent implements OnInit {

  roomId: string = '*not booked yet*';
  constructor() { }

  ngOnInit() {
  }

}

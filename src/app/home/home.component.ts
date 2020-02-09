import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images;

  constructor() { }

  ngOnInit() {
    this.images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  }

}

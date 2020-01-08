import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
game:any=[]
  constructor() { }
  ngOnInit() {
    this.game =[
    {
      "id":"1",
      "name":"dota"
    },
    {
      "id":"2",
      "name":"dota1"
    },
    {
      "id":"3",
      "name":"dota2"
    },
    {
      "id":"4",
      "name":"dota3"
    },
    {
      "id":"5",
      "name":"dota4"
    },
    {
      "id":"6",
      "name":"dota5"
    },
    {
      "id":"7",
      "name":"dota6"
    }
  ]
}
  
}

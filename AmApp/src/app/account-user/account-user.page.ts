import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../call-api.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.page.html',
  styleUrls: ['./account-user.page.scss'],
})
export class AccountUserPage implements OnInit {
  userName: any;
  datauser : User
  constructor(public callApi: CallApiService,public route: Router) { }

  ngOnInit() {
    this.userName = this.callApi.nameUser
    console.log(this.userName);
  }
  ionViewDidEnter() {
    this.calldataUser();

  }
  calldataUser() {
    this.userName = this.callApi.nameUser
    console.log(this.userName);
    this.callApi.GetUserbyData(this.userName).subscribe(it => {
      console.log(it);
      this.datauser = it
    });
  }
  gotolist() {
    this.route.navigate(['/list']);
  }
}

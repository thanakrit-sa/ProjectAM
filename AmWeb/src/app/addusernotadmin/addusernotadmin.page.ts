import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-addusernotadmin',
  templateUrl: './addusernotadmin.page.html',
  styleUrls: ['./addusernotadmin.page.scss'],
})
export class AddusernotadminPage implements OnInit {  

  datauser: FormGroup;
  submit: boolean = false;
  data: user;

  constructor(public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.datauser = this.formbuilder.group({
      'iduser': [null, Validators.required],
      'nameuser': [null, Validators.required],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'teluser': [null, Validators.required],
      'statususer': [null, Validators.required],
      'addressuser': [null, Validators.required],
      'carduser': [null, Validators.required]

    })
  }
  get f() { return this.datauser.controls; }

  async log() {
    this.submit = true;
    console.log(this.datauser.value);
    console.log(this.datauser);
    this.data = this.datauser.value;
    this.userApi.AddDataUser(this.data).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/user']);
  }

  ngOnInit() {
  }

}

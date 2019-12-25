import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {
  dataUser: FormGroup;
  submit: boolean = false;
  dataUs: user;

  constructor(public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataUser = this.formbuilder.group({
      'idUser': [null, Validators.required],
      'nameUser': [null, Validators.required],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'telUser': [null, Validators.required],
      'levelUser': [null, Validators.required],
      'addressUser': [null, Validators.required]

    })
  }
  get f() { return this.dataUser.controls; }
  
  async log() {
    this.submit = true;
    console.log(this.dataUser.value);
    console.log(this.dataUser);
    this.dataUs = this.dataUser.value;
    this.userApi.AddDataUser(this.dataUs).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/user']);
  }
  
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CallApiService } from '../call-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/User';
import { MenuController, AlertController } from '@ionic/angular';
import { log } from 'util';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: FormGroup;
  datauser: User;
  user1: any;
  usercheck
  passcheck
  constructor(public alertController: AlertController, public route: Router, public callApi: CallApiService, public form: FormBuilder, public menuCtrl: MenuController) {

    this.user = this.form.group({
      'user': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  async presentAlertPass() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'Password ไม่ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertUser() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'ไม่มี Username นี้ในระบบ',
      buttons: ['OK']
    });

    await alert.present();
  }

  async  presentAlertUserlandPassWordnoMacth() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: ' Username หรือ Password ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async  presentAlertUsernullandPassWordnonull() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'กรุณากรอก Username และ Password',
      buttons: ['OK']
    });

    await alert.present();
  }
  async  passwordnull() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'กรุณากรอก Password',
      buttons: ['OK']
    });

    await alert.present();
  }
  async  usernamenull() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'กรุณากรอก Username ',
      buttons: ['OK'],

    });

    await alert.present();

  }

  ngOnInit() {
    this.callApi.GetUserData().subscribe(it => {

      this.user1 = it
      this.datauser = it
      console.log(this.datauser);


    })

    this.menuCtrl.enable(false);

  }

  gotoList() {

    for (let index = 0; index < Object.keys(this.user1).length; index++) {

      console.log(this.datauser[index]);
      if (this.user1[index].username == this.user.value.user && this.user.value.password == this.user1[index].password) {
        // console.log("pass");
        console.log(this.datauser[index].username);
        console.log(this.datauser[index].password);
        this.callApi.nameUser = this.user1[index].nameUser
        this.callApi.levelUser = this.user1[index].levelUser
        // console.log(this.callApi.Account);
        // console.log(this.callApi.Account);
        this.usercheck = this.user1[index].username
        this.passcheck = this.user1[index].password
        this.route.navigate(['/list']);
        break
      }

      else if (this.user.value.user == null && this.user.value.password != null) {
        this.usernamenull();
        break;
      }
      else if (this.user.value.password == null && this.user.value.user != null) {
        this.passwordnull();
        break;
      }
      else if (this.user.value.user == null && this.user.value.password == null) {
        this.presentAlertUsernullandPassWordnonull();
        break;
      }
      else if (this.user.value.user == "" && this.user.value.password != "") {
        this.usernamenull();
        break;
      }
      else if (this.user.value.password == "" && this.user.value.user != "") {
        this.passwordnull();
        break;
      }
      else if (this.user.value.user == "" && this.user.value.password == "") {
        this.presentAlertUsernullandPassWordnonull();
        break;
      }

      // else if (this.datauser.username != this.user.value.user && this.datauser.password != this.user.value.password) {
      //   this.presentAlertUserlandPassWordnoMacth();
      //   break;
      // }
      else {
        this.presentAlertUserlandPassWordnoMacth();
      }
      
      // else if (this.datauser.username == this.user.value.user && this.datauser.password != this.user.value.password) {
      //   this.presentAlertPass();
      //   break;
      // }


    }
  }

}



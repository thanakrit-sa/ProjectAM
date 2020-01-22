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
  usercheck
  passcheck
  constructor(public alertController: AlertController, public route: Router, public callApi: CallApiService, public form: FormBuilder, public menuCtrl: MenuController) {

    this.user = this.form.group({
      'user': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'Password ไม่ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert1() {
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
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.callApi.GetUserData().subscribe(it => {


      this.datauser = it
      console.log(this.datauser);


    })

    this.menuCtrl.enable(false);

  }

  gotoList() {
    console.log(this.user.value.user);
    console.log(this.datauser[0].username);
    console.log(this.user.value.password);
    console.log(this.datauser[0].password);
    for (let index = 0; index < Object.keys(this.datauser).length; index++) {

      if (this.datauser[index].username == this.user.value.user && this.user.value.password == this.datauser[index].password) {
        console.log("pass");
        console.log(this.datauser[index]);
        this.callApi.nameUser = this.datauser[index].nameUser
        this.callApi.levelUser = this.datauser[index].levelUser
        // console.log(this.callApi.Account);
        // console.log(this.callApi.Account);
        this.usercheck = this.datauser[index].username
        this.passcheck = this.datauser[index].password
        this.route.navigate(['/list']);
        break;
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
      else if (this.datauser[index].username == this.user.value.user && this.user.value.password != this.datauser[index].password) {
        this.presentAlert2();
        break;
      }
      else if (this.datauser[index].username != this.user.value.user && this.user.value.password == this.datauser[index].password) {
        this.presentAlert1();
        break;
      }
      else if (this.datauser[index].username != this.user.value.user && this.user.value.password != this.datauser[index].password) {
        this.presentAlertUserlandPassWordnoMacth();
        break;

      }
    }

  }

}

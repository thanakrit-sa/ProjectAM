import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-addusernotadmin',
  templateUrl: './addusernotadmin.page.html',
  styleUrls: ['./addusernotadmin.page.scss'],
})
export class AddusernotadminPage implements OnInit {  

  datauser: FormGroup;
  submit: boolean = false;
  data: user;

  constructor(public alertController: AlertController,public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
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

  async ConfirmInsert() {
    const alert = await this.alertController.create({      
      message: 'ต้องการที่จะเพิ่มสมาชิกหรือไม่ ?',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.log();
            console.log('Confirm Okay');
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',          
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  log() {
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

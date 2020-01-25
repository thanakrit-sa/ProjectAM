import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { admin } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {
  dataadmin: FormGroup;
  submit: boolean = false;
  dataUs: admin;

  constructor(public alertController: AlertController,public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataadmin = this.formbuilder.group({
      'idadmin': [null, Validators.required],
      'nameadmin': [null, Validators.required],
      'usernameadmin': [null, Validators.required],
      'passwordadmin': [null, Validators.required],
      'teladmin': [null, Validators.required],
      'leveladmin': [null, Validators.required],
      'addressadmin': [null, Validators.required]

    })
  }
  get f() { return this.dataadmin.controls; }

  async ConfirmInsert() {
    const alert = await this.alertController.create({      
      message: 'ต้องการที่จะเพิ่มผู้ดูแลหรือไม่ ?',
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
    console.log(this.dataadmin.value);
    console.log(this.dataadmin);
    this.dataUs = this.dataadmin.value;
    this.userApi.AddDataAdmin(this.dataUs).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/user']);
  }
  
  ngOnInit() {
  }

}

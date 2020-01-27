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
  isShowValidate: boolean = false;
  constructor(public alertController: AlertController, public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataadmin = this.formbuilder.group({
      // 'idadmin': [null, Validators.required],
      'nameadmin': ["", Validators.required],
      'usernameadmin': ["", Validators.required],
      'passwordadmin': ["", Validators.required],
      'teladmin': ["", Validators.compose([Validators.pattern('(^0)([1-9]){2}-([1-9]){3}-([0-9]){4}$'), Validators.required])],
      'leveladmin': ["", Validators.required],
      'addressadmin': ["", Validators.required]

    })
  }

  // ------------------------------------------------------------------------------------- Validation

  public errorMessages = {
    teladmin: [
      { type: 'required', message: 'กรุณากรอกเบอร์โทร' },
      { type: 'pattern', message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง 0XX-XXX-XXXX' }
    ],    
    // idadmin: [
    //   { type: 'required', message: 'กรุณากรอกรหัสผู้ดูแล' }
    // ],
    nameadmin: [
      { type: 'required', message: 'กรุณากรอกชื่อผู้ดูแล' }
    ],
    usernameadmin: [
      { type: 'required', message: 'กรุณากรอกชื่อผู้ใช้' }
    ],
    passwordadmin: [
      { type: 'required', message: 'กรุณากรอกรหัสผ่าน' }
    ],
    leveladmin: [
      { type: 'required', message: 'กรุณากรอกระดับผู้ดูแล' }
    ],
    addressadmin: [
      { type: 'required', message: 'กรุณากรอกที่อยู่' }
    ]
  };
  get nameadmin() {
    return this.dataadmin.get("nameadmin");
  }
  get usernameadmin() {
    return this.dataadmin.get("usernameadmin");
  }
  get passwordadmin() {
    return this.dataadmin.get("passwordadmin");
  }
  get leveladmin() {
    return this.dataadmin.get("leveladmin");
  }
  get addressadmin() {
    return this.dataadmin.get("addressadmin");
  }
  get teladmin() {
    return this.dataadmin.get("teladmin");
  }

  check() {
    if (this.dataadmin.value.nameadmin == "" && this.dataadmin.value.usernameadmin == "" && this.dataadmin.value.passwordadmin == "" && this.dataadmin.value.leveladmin == ""
      && this.dataadmin.value.addressadmin == "" && this.dataadmin.value.teladmin == "") {
      this.isShowValidate = true;
    }    
    else if((this.dataadmin.value.nameadmin != "" && this.dataadmin.value.usernameadmin != "" && this.dataadmin.value.passwordadmin != "" && this.dataadmin.value.leveladmin != ""
    && this.dataadmin.value.addressadmin != "" && this.dataadmin.value.teladmin != "")){
      this.isShowValidate = false;
      this.ConfirmInsert();
      console.log("false");
    }
  }

  // ------------------------------------------------------------------------------------- Insert

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

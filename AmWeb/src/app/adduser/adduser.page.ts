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

  isShowValidateName: boolean = false;
  isShowValidateUsername: boolean = false;
  isShowValidatePassword: boolean = false;
  isShowValidateTel: boolean = false;
  isShowValidateLevel: boolean = false;
  isShowValidateAddress: boolean = false;
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

  async Alert() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน.',
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  public errorMessages = {
    teladmin: [
      { type: 'pattern', message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง 0XX-XXX-XXXX' }
    ],
  };

  get teladmin() {
    return this.dataadmin.get("teladmin");
  }

  check() {
    if (this.dataadmin.value.nameadmin != "" && this.dataadmin.value.usernameadmin != "" && this.dataadmin.value.passwordadmin != "" && this.dataadmin.value.leveladmin != ""
      && this.dataadmin.value.addressadmin != "" && this.dataadmin.value.teladmin != "") {
      this.ConfirmInsert();
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
    }
    else if (this.dataadmin.value.nameadmin == "") {
      this.isShowValidateName = true;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.usernameadmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = true;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.passwordadmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = true;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.leveladmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = true;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.addressadmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = true;
      this.Alert();
    }
    else if (this.dataadmin.value.teladmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = true;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
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

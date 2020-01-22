import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { admin, user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public dataAdminAll: admin;
  public dataUserAll: user;
  isShowAdmin: boolean = false;
  isShowUser: boolean = false;
  constructor(public activate: ActivatedRoute, public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.getShowAdmin();
    this.getShowUser();
  }

  ionViewDidEnter() {
    this.getShowAdmin();
    this.getShowUser();
  }

  getShowAdmin() {
    this.userApi.GetAdminAll().subscribe((it) => {
      console.log(it);
      this.dataAdminAll = it;
      console.log(this.dataAdminAll);
    });
  }

  getShowUser() {
    this.userApi.GetUserAll().subscribe((it) => {
      console.log(it);
      this.dataUserAll = it;
      console.log(this.dataUserAll);
    });
  }

  deleteAdmin(idAdmin) {
    this.userApi.DeleteDataAdmin(idAdmin).subscribe(it => {
      this.userApi.GetAdminAll().subscribe((it) => {
        console.log(it);
        this.dataAdminAll = it;
        console.log(this.dataAdminAll);

      });
    });
  }

  public EditDataAdmin(idAdmin) {
    this.route.navigate(['/edit-user', { _id: idAdmin }]);
  }

  public EditDataUser(idUser) {
    this.route.navigate(['/edit-usernotadmin', { _id: idUser }]);
  }

  showcontentAdmin() {
    if (this.isShowAdmin == true) {
      this.isShowAdmin = false;
    } else {
      this.isShowAdmin = true;
    }
  }
  showcontentUser() {
    if (this.isShowUser == true) {
      this.isShowUser = false;
    } else {
      this.isShowUser = true;
    }
  }
  deleteUser(idUser) {
    this.userApi.DeleteDataUser(idUser).subscribe(it => {
      this.userApi.GetUserAll().subscribe((it) => {
        console.log(it);
        this.dataUserAll = it;
        console.log(this.dataUserAll);

      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public dataUserAll: user;
  constructor(public activate: ActivatedRoute, public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.userApi.GetUserAll().subscribe((it) => {
      console.log(it);
      this.dataUserAll = it;
      console.log(this.dataUserAll);
    });
  }

  ionViewDidEnter() {
    this.userApi.GetUserAll().subscribe((it) => {
      console.log(it);
      this.dataUserAll = it;
      console.log(this.dataUserAll);
    });
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
  
  public EditDataUser(id) {
    this.route.navigate(['/edit-user', { _id: id }]);
  }
}

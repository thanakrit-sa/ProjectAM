import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { admin } from 'src/Models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  datauser:FormGroup;
  user:any;
  pass:any;
  data:admin;
  
  constructor(public usertApi: UserService, public formbuilder: FormBuilder, public route: Router,private menu: MenuController) {    
    this.datauser = this.formbuilder.group({
      'user':[null,Validators.required],
      'pass':[null,Validators.required]
    });
   }
 
  ngOnInit() 
  {
    this.usertApi.GetAdminAll().subscribe((it) => {      
      this.data = it; 
      console.log(this.data);
      
    });
    
  }

  login(){
    console.log(this.datauser.value);
    console.log(this.data[0].usernameadmin);
    for (let index = 0; index < Object.keys(this.data).length; index++) {
      if (this.data[index].usernameAdmin == this.datauser.value.user && this.datauser.value.pass == this.data[index].passwordAdmin) {
        console.log("true");
        console.log(this.data[index]);
        this.usertApi.statusAdmin = this.data[index].levelAdmin;
        this.usertApi.nameAdmin = this.data[index].nameAdmin;
        console.log(this.usertApi.statusAdmin);
        console.log(this.usertApi.nameAdmin);
        this.route.navigate(['/dashbroad']);
        
      }else{
        console.log("false");
      }
      
    }
    // this.usertApi.checkMenu = true;
  }

}

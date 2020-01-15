import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { user } from 'src/Models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  datauser:FormGroup;
  user:any;
  pass:any;
  data:user;
  constructor(public usertApi: UserService, public formbuilder: FormBuilder, public route: Router) {    
    this.datauser = this.formbuilder.group({
      'user':[null,Validators.required],
      'pass':[null,Validators.required]
    });
   }
 
  ngOnInit() 
  {
    this.usertApi.GetUserAll().subscribe((it) => {      
      this.data = it; 
      console.log(this.data);
          
    });
  }

  login(){
    console.log(this.datauser.value);
    console.log(this.data[0].username);
    for (let index = 0; index < Object.keys(this.data).length; index++) {
      if (this.data[index].username == this.datauser.value.user && this.datauser.value.pass == this.data[index].password) {
        console.log("true");
        console.log(this.data[index]);
        this.usertApi.statusUser = this.data[index].levelUser;
        this.usertApi.nameUser = this.data[index].nameUser;
        console.log(this.usertApi.statusUser);
        console.log(this.usertApi.nameUser);
        this.route.navigate(['/dashbroad']);
        
      }else{
        console.log("false");
      }
      
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  dataProduct: product;
  dataUser: user;

  order :any;
  constructor(public route: Router, public productApi: ProductService, public navCtrl: NavController, public userApi: UserService) { }

  ngOnInit() {
    this.productApi.GetProductAll().subscribe(it => {
      console.log(it);
      this.dataProduct = it;
      console.log(this.dataProduct); 
 

  
    });

    this.userApi.GetUserAll().subscribe(it=>{
      console.log(it);
      this.dataUser = it;
      console.log(this.dataUser); 
   
    });
  }
  
}

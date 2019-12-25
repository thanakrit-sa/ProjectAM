import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public dataProductAll :product;
  constructor(public activate: ActivatedRoute,public userApi:UserService, public productApi: ProductService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    console.log(this.userApi.statusUser);
    console.log(this.userApi.nameUser);
    
   }

  ngOnInit() {
    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataProductAll = it;
      console.log(this.dataProductAll);
    });
  }

  

  ionViewDidEnter(){
    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataProductAll = it;
      console.log(this.dataProductAll);
    });
  }
  
  deleteDataProduct(idProduct) {
    this.productApi.DeleteDataPeoduct(idProduct).subscribe(it => {
      this.productApi.GetProductAll().subscribe((it) => {
        console.log(it);
        this.dataProductAll = it;
        console.log(this.dataProductAll);

      });
    });
  }

  public EditDataProduct(id) {
    this.route.navigate(['/edit-product', { _id: id }]);
  }
}

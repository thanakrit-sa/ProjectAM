import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  dataProduct: FormGroup;
  submit: boolean = false;
  dataPd: product;
  constructor(public productApi: ProductService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataProduct = this.formbuilder.group({
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      'typeProduct': [null, Validators.required],
      'priceProduct': [null, Validators.required],
      'costProduct': [null, Validators.required]      
    });
   }

   get f() { return this.dataProduct.controls; }
   
  ngOnInit() {
  }

    
  async log() {
    this.submit = true;
    console.log(this.dataProduct.value);
    console.log(this.dataProduct);
    this.dataPd = this.dataProduct.value;
    this.productApi.AddDataProduct(this.dataPd).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/product']);
  }
}

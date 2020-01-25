import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  dataProduct: FormGroup;
  submit: boolean = false;
  dataPd: product;
  constructor(public alertController: AlertController,public productApi: ProductService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
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

  async ConfirmInsert() {
    const alert = await this.alertController.create({      
      message: 'ต้องการที่จะเพิ่มสินค้าหรือไม่ ?',
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
    
    console.log(this.dataProduct.value);
    console.log(this.dataProduct);
    this.dataPd = this.dataProduct.value;
    this.productApi.AddDataProduct(this.dataPd).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/product']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Order } from 'src/Models/order';
import { product } from 'src/Models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from "src/app/service/product.service";
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  order: FormGroup
  dataProduct: any;
  data1: {};
  dataorder: Order
sum : any;
datasum :any;

  constructor(public callapiOrder:OrderService,public callapiProduct: ProductService, public formbuilder: FormBuilder, public alertController: AlertController, public router: Router) {
    this.order = this.formbuilder.group({
      'idOrder': [null],
      'idProduct': [null],
      'nameProduct': [null],
      'amountProduct': [null],
      'priceOrder': [null],
      'nameUser': [null],
      'telUser': [null],
      'addressUser': [null],
      'dateOrder': [null],
      'sendDate': [null],
      'status': [null],
      'type': [null],
      'price': [null],
    })
  }
  get f() { return this.order.controls; }

  ngOnInit() {
    this.listdata()
  }
  listdata() {
    this.callapiProduct.GetProductAll().subscribe(it => {
      console.log(it);
      this.dataProduct = it;
      console.log(this.dataProduct);
    })
  }
  getbydata(data) {
    this.callapiProduct.GetProductBydata(data).subscribe(it => {
      this.data1 = it
      this.datasum = it
      console.log(this.data1);

    });
  }
  onChange(data) {
    this.getbydata(data)
    // console.log(data);
  }

  amount(q){
    console.log(this.datasum);
    console.log(q);
    this.sum = q * this.datasum.priceProduct
    console.log(this.sum);
    

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '',
      message: '<strong>ยืนยันการสั่งซื้อ</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ok',
          handler: () => {
            console.log(this.order.value);
            console.log(this.order);
            this.dataorder = this.order.value;
            this.callapiOrder.AddOrder(this.dataorder).subscribe(it => {
              console.log(it);

            });
            this.router.navigate(['/order-list']);
          }
        }
      ]
    });

    await alert.present();
  }
}

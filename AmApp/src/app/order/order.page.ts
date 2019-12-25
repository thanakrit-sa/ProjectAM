import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Order } from '../Models/Order';
import { Product } from '../Models/Product';




@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  order: FormGroup;
  dataorder: Order;
  dataProduct: Product;
  data: any;
  data1: {};
  sum: any
  datasum :any
  constructor(public alertController: AlertController, public route: Router, public callApi: CallApiService, public navCtrl: NavController, public formbuilder: FormBuilder) {

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
    })
  }
  get f() { return this.order.controls; }




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
            this.callApi.AddOrder(this.dataorder).subscribe(it => {
              console.log(it);

            });




            this.route.navigate(['/list']);
          }
        }
      ]
    });

    await alert.present();
  }


  ngOnInit() {
    this.listdata()
  }

  listdata() {
    this.callApi.getallproduct().subscribe(it => {
      console.log(it);
      this.dataProduct = it;
      console.log(this.dataProduct);
    })
  }
  getbydata(data) {
    this.callApi.GetProductBydata(data).subscribe(it => {
      this.data1 = it
      this.datasum = it
      console.log(this.data1)
 
    });
  }
  onChange(data) {
    this.getbydata(data)
    // console.log(data);

  }
  amount(q) {
    console.log(this.datasum);
    console.log(q);
    this.sum = q * this.datasum.priceProduct
    console.log(this.sum);

  }
}

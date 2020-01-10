import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Order } from '../Models/Order';
import { Product } from '../Models/Product';
import { ProductService } from '../product.service';




@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  www: "55"
  order: FormGroup;
  dataorder: Order;
  dataProduct: Product;
  data: any;
  data1: {};
  sum: any
  datasum: any
  id: any;
  check: any;
  t: number;
  a: number;
  aa: any
  tt: any
  constructor(public productapi: ProductService, public tost: ToastController, public alertController: AlertController, public alertController1: AlertController, public route: Router, public callApi: CallApiService, public navCtrl: NavController, public formbuilder: FormBuilder) {
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
      'total': [null]
    })
  }
  get f() { return this.order.controls; }

  test() {
    console.log(5);

  }
  async presentToast1() {
    const toast = await this.tost.create({
      message: 'สั่งซื้อสินค้าเรียบร้อย',
      duration: 5000,
      color: "success",
      position: 'top'
    });
    toast.present();
  }
  async presentAlert1() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'สินค้าคงเหลือในคลังสินค้าไม่พอ',
      buttons: ['OK']
    });

    await alert.present();
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
            // console.log(this.order.value);
            this.dataorder = this.order.value;
            this.callApi.GetProductid(this.dataorder.idProduct).subscribe(it => {
              this.tt = it.total
              this.aa = this.dataorder.amountProduct
              this.a = parseInt(this.aa, this.a)
              this.t = parseInt(this.tt, this.t)

              // console.log("จำนวน " + this.a);
              // console.log("คงเหลือ " + this.t);

              if (this.a <= this.t) {
                // console.log('dai');
                this.t = 0;
                this.a = 0;

                this.callApi.AddOrder(this.dataorder).subscribe(it => {
                  // console.log(it);
                  // console.log(this.order.value.idProduct);
                  // console.log(this.order.value);
                });
                this.productapi.AddSellTotalProduct(this.order.value.idProduct, this.order.value).subscribe(it => {
                  // console.log(it);
                });
              this.presentToast1();
                this.route.navigate(['/list']);
              }
              else {
                // console.log("maidai");
                this.t = 0;
                this.a = 0;
                this.presentAlert1();
              }
            });
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
     
      this.dataProduct = it;

    })
  }
  getbydata(data) {

    this.callApi.GetProductBydata(data).subscribe(it => {
      this.data1 = it
      this.datasum = it

      // console.log(this.data1)

    });
  }
  onChange(data) {

    this.getbydata(data)
    // console.log(data);
  }
  amount(q) {
    // console.log(this.datasum);
    // console.log(q);
    this.sum = q * this.datasum.priceProduct
    // console.log(this.sum);

  }
}

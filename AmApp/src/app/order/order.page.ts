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

  order: FormGroup;
  dataorder: Order;
  dataProduct: Product;
  data: any;
  data1: {};
  sum: any
  datasum: any
  id: any;
  check: any;
  total: number;
  amountp: number;
  amountnumber: number;
  aamount: any
  ttotal: any
  constructor(public productapi: ProductService, public tost: ToastController, public alertController: AlertController, public alertController1: AlertController, public route: Router, public callApi: CallApiService, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.order = this.formbuilder.group({
      'idOrder': [null],
      'idProduct': [null],
      'nameProduct': [null],
      'amountProduct': [null],
      'priceOrder': [null],
      'nameUser': [""],
      'telUser': [""],
      'addressUser': [""],
      'dateOrder': [null],
      'sendDate': [null],
      'status': [null],
      'userOrder': [null],
      'total': [null]
    })
  }
  get f() { return this.order.controls; }
  gotolist() {
    this.route.navigate(['/list']);
  }
  test() {
    console.log(5);

  }
  async presentToast1() {
    const toast = await this.tost.create({
      message: 'สั่งซื้อสินค้าเรียบร้อย',
      duration: 1000,
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
  async presentAlert3() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'กรุณากรอกจำนวนสินค้าให้ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async sold() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'สินค้าชิ้นนี้หมดแล้ว',
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
            this.order.value.userOrder = this.callApi.nameUser
            console.log(this.order.value.userOrder);

            this.dataorder = this.order.value;
            console.log(this.dataorder);

            this.callApi.GetProductid(this.dataorder.idProduct).subscribe(it => {
              this.ttotal = it.totalProduct
              this.aamount = this.dataorder.amountProduct
              this.amountnumber = parseInt(this.aamount, this.amountnumber)
              this.total = parseInt(this.ttotal, this.total)
              console.log(it);

              console.log("จำนวน " + this.amountnumber);
              console.log("คงเหลือ " + this.total);

              if (this.amountnumber <= this.total && this.amountnumber != 0 && this.dataorder.nameUser != "" && this.dataorder.telUser != "" && this.dataorder.addressUser != "") {
                // console.log('dai');
                this.total = 0;
                this.amountnumber = 0;

                this.callApi.AddOrder(this.dataorder).subscribe(it => {
                  // console.log(it);
                  // console.log(this.order.value.idProduct);
                  // console.log(this.order.value);
                });
                this.productapi.AddSellTotalProduct(this.order.value.idProduct, this.order.value).subscribe(it => {
                  // console.log(it);
                });
                this.amountp = null
                this.sum = null
                this.presentToast1();
                this.route.navigate(['/list']);


              }
              else if (this.amountnumber == 0) {
                this.presentAlert2();


                this.total = 0;
                this.amountnumber = 0;
              }
              else if (this.amountnumber > this.total) {
                this.presentAlert1();

                this.total = 0;
                this.amountnumber = 0;
              }
              else {
                this.presentAlert3();
                this.total = 0;
                this.amountnumber = 0;

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
      if (it.totalProduct == "0"){
        this.sold()
        console.log("สินค้าหมดแล้ว");
        
      }
        console.log(this.data1)

    });
  }
  onChange(data) {
    this.amountp = null
    this.sum = null
    this.getbydata(data)

  }
  amount(qs) {
    this.amountp = qs
    // console.log(this.datasum);
    // console.log(q);
    this.sum = qs * this.datasum.priceProduct
    // console.log(this.sum);

  }
}

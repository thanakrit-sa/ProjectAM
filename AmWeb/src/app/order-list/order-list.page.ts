import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Order } from 'src/Models/order';
import { OrderService } from '../service/order.service';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  dataOrder: Order;
  dataProduct: product;
  dataUser: user;
data
  order: any;
  constructor(public route: Router,
    public productApi: ProductService,
    public navCtrl: NavController,
    public userApi: UserService,
    public orderApi: OrderService,
    public alertController: AlertController, 
    public tost: ToastController) { }

  ngOnInit() {
    
this.getall();
    this.userApi.GetUserAll().subscribe(it => {
      console.log(it);
      this.dataUser = it;
      console.log(this.dataUser);

    });
  }

  getall(){
    this.orderApi.GetListAllProduct().subscribe(it => {
      console.log(it);
      this.dataOrder = it;
      console.log(this.dataOrder);
  });
}


  

  ///////////////// แจ้งเตือน/////////////////////////////////////
  async presentToast() {
    const toast = await this.tost.create({
      message: 'รับ Order Succes',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  async presentToast1() {
    const toast = await this.tost.create({
      message: '่ส่งสินค้า Succes',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  ////////////////////////////////////////////////////////////
  /////////////////////////////ยกเลิก Order////////////////////////
  getid(id) {
    this.orderApi.GetProductById(id).subscribe(it => {
      console.log(it);
      this.data = it
      console.log(this.data);
      this.editokorder(id)
    });

  }
  editokorder(id) {
    console.log(id);
    this.orderApi.editokorder(id, this.data).subscribe(it => {
      this.data = it;
      console.log(this.data);

      this.getall();
    });
  }
  async okorder(id) {
    const alert = await this.alertController.create({
      header: 'ยืนยันการรับ Order',

      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('ยกเลิก');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            this.getid(id)
            this.presentToast();

          }
        }
      ]
    });

    await alert.present();
  }
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////รับของ Order///////////////////////////////
  async sendorder(id) {
    const alert = await this.alertController.create({
      header: 'ยืนยันการส่งสินค้า',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('ยกเลิก');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            this.presentToast1()
            this.sendid(id)
          }
        }
      ]
    });
    await alert.present();
  }
  sendid(id) {
    this.orderApi.GetProductById(id).subscribe(it => {
      console.log(it);
      this.data = it
      console.log(this.data);
      this.editsendorder(id)
    });
  }
  editsendorder(id) {
    this.orderApi.editsendorder(id, this.data).subscribe(it => {
      this.data = it;
      console.log(it);
      this.getall();
    });
  }

}

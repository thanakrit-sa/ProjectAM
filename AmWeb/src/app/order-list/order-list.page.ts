import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { admin } from 'src/Models/user';
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
  template: ` <ion-header>
  <ion-toolbar color="dark" text-center>
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>รายการสั่งซื้อ</ion-title>
        <ion-button style="padding-right: 15px" slot='end' [routerLink]="['/order']" color="light">สั่งซื้อ</ion-button>
  </ion-toolbar>
  <style>
  .my-pagination /deep/ .ngx-pagination .current {
    background: black;
  }
</style>
</ion-header><br>

<ion-content class="content" text-center>
<br>
  <ion-card >
  <ion-item>
    <ion-label>รายการ</ion-label>
    <ion-select placeholder="เลือกรายการที่ต้องการ" (ionChange)="onChange(data)" [(ngModel)]="data">
      <ion-select-option >ทั้งหมด</ion-select-option>
      <ion-select-option value ="สั่งซื้อ">สั่งซื้อ</ion-select-option>
      <ion-select-option value ="รับสั่งซื้อ">รับ Order แล้ว</ion-select-option>
      <ion-select-option value ="ส่งสินค้า">ส่งสินค้าแล้ว</ion-select-option>
      <ion-select-option value ="ยกเลิก">ยกเลิก</ion-select-option>
      <ion-select-option value ="ได้รับแล้ว">ได้รับสินค้าแล้ว</ion-select-option>
     
    </ion-select>
  </ion-item>
</ion-card>
<br>

  <ion-card>
    <ion-card-content>
  <ion-row text-center style="border-bottom:groove;" >
    <ion-col>
      <ion-label><b>รหัสสั่งซื้อ</b></ion-label>
    </ion-col>

    

    <ion-col>
      <ion-label><b>ชื่อสินค้า</b></ion-label>
    </ion-col>

    <ion-col>
      <ion-label><b>จำนวนสินค้า</b></ion-label>
    </ion-col>

    <ion-col>
      <ion-label><b>ราคาสินค้า</b></ion-label>
    </ion-col>

   

   

    <ion-col span="3">
      <ion-label></ion-label>
    </ion-col>
  </ion-row>

  <ion-row  *ngFor="let a of datafilter | paginate: { itemsPerPage: 8, currentPage: p }" text-center style="border-bottom: groove">
    <ion-col  class="co">
      <ion-label>{{a.idOrder}}</ion-label>
    </ion-col >   
    <ion-col class="co">
      <ion-label>{{a.nameProduct}}</ion-label>
    </ion-col>
    <ion-col class="co">
      <ion-label>{{a.amountProduct}} </ion-label>
    </ion-col>
    <ion-col class="co">
      <ion-label>{{a.priceOrder}} </ion-label>
    </ion-col>


    


  
    
    <ion-col class="co" >
        <ion-button  color="dark" (click)="getdetail(a.idOrder)" >รายละเอียดสินค้า</ion-button> 

        <ion-button  color="secondary" (click)="okorder(a.idOrder)" *ngIf="a.status == 'สั่งซื้อ'" class="a">รับคำสั่งซื้อ</ion-button>
        <ion-button  color="success" (click)="sendorder(a.idOrder)" *ngIf="a.status == 'รับสั่งซื้อ'" class="a">รับสั่งซื้อ</ion-button>     
        <ion-button  color="danger" disabled (click)="sendorder(a.idOrder)" *ngIf="a.status == 'ยกเลิก'" class="a">ยกเลิก</ion-button>     
        <ion-button  color="warning"  disabled (click)="sendorder(a.idOrder)" *ngIf="a.status == 'ส่งสินค้า'" class="a">ส่งสินค้า</ion-button> 
        <ion-button  color="dark" disabled (click)="sendorder(a.idOrder)" *ngIf="a.status == 'ได้รับแล้ว'" class="a">ได้รับแล้ว</ion-button> 
    </ion-col>
 
  </ion-row>
  </ion-card-content>
</ion-card><br>
<div class="page">
<ion-row>
<ion-col text-left>
<br>
<ion-label>จำนวนรายการสั่งซื้อ <b>{{countdata}}</b> รายการ.</ion-label>
</ion-col>
<ion-col text-right>
<pagination-controls (pageChange)="p = $event"   
  previousLabel="ย้อนกลับ"
  maxSize="5"
  nextLabel="ถัดไป"

  class="my-pagination"
  ></pagination-controls>
  </ion-col>
  </ion-row>
  </div>
</ion-content> `
})





export class OrderListPage implements OnInit {

  dataOrder: Order;
  dataProduct: product;
  dataUser: admin;
  data
  order: any;
  datafilter: Order[] = [];
  arrayfilter: Order[] = [];

  constructor(
    public route: Router,
    public productApi: ProductService,
    public navCtrl: NavController,
    public userApi: UserService,
    public orderApi: OrderService,
    public alertController: AlertController,
    public tost: ToastController
  ) { }

  ///////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getall();
    this.getdataarray();
    this.userApi.GetAdminAll().subscribe(it => {
      console.log(it);
      this.dataUser = it;
      console.log(this.dataUser);
    });
  }

  ionViewDidEnter() {
    this.getall();
    this.getdataarray();
  }

  getall() {
    this.orderApi.GetListAllProduct().subscribe(it => {
      console.log(it);
      this.dataOrder = it;
      console.log(this.dataOrder);
    });
  }
countdata
  getdataarray() {
    this.orderApi.GetListAllProduct().subscribe(it => {
      this.dataOrder = it;
      console.log(this.dataOrder);
      for (let index = 0; index < Object.keys(this.dataOrder).length; index++) {
        this.datafilter[index] = this.dataOrder[index]
        this.arrayfilter[index] = this.datafilter[index]
      }
this.countdata = Object.keys(this.datafilter).length
    
    });
  }
  //////////////////////////////////////////////////////////////
  ///*/////////////////////// filter///////////////////////////
  onChange(data) {
    if (data == "ทั้งหมด") {
      this.getdataarray()
    }

    else {
      this.datafilter = this.arrayfilter.filter(it =>
        it.status == data
        
      )
      this.countdata = Object.keys(this.datafilter).length
    }
  }

  ///////////////// แจ้งเตือน/////////////////////////////////////
  async presentToast() {
    const toast = await this.tost.create({
      message: ' รับ Order Succes ',
      duration: 2000,
      color: "success",
      position: 'top'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.tost.create({
      message: '่ ส่งสินค้า Succes ',
      duration: 2000,
      color: "secondary",
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
      this.getdataarray();
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
      this.getdataarray();
    });
  }

  getdetail(id) {
    this.route.navigate(['/detail', { _id: id }]);
  }



}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { Product } from '../Models/Product';
import { Order } from '../Models/Order';
import { log } from 'util';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>
      List
    </ion-title>
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-button (click)="gotoOrder()" color="primary" slot="end" size="small" >
      <ion-icon name="add-circle"></ion-icon>
      สั่งซื้อ
    </ion-button>
  </ion-toolbar>
</ion-header>

<ion-content padding>

  <div text-center>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h4>รายการสั่งซื้อ</h4>
      </div>
    </div>
  </div>

<ion-searchbar placeholder="ค้นหาสินค้า" [(ngModel)]="search"></ion-searchbar>
 <br>

  <ion-row class="row">

    <ion-col size="5">
      <ion-label>สินค้า</ion-label>
    </ion-col>

    <ion-col size="2">
      <ion-label>จำนวน</ion-label>
    </ion-col>

    <ion-col size="2">
      <ion-label>วันที่</ion-label>
    </ion-col>

    <ion-col style="background-color: aqua" size="3">
      <ion-label>สถานะ</ion-label>
    </ion-col>

    <!-- <ion-col  style="background-color: blueviolet" size="3" >
      <ion-label>ดู</ion-label>
    </ion-col> -->

  </ion-row>

  <ion-row *ngFor="let a of datasearch2 |filter:search| paginate: { itemsPerPage: 5, currentPage: p }">
    <ion-item-sliding>
      <ion-item (click)="gotoOrderdetail(a.idOrder)">
        <ion-col size="5">
          <ion-label>{{a.nameProduct}}</ion-label>
        </ion-col>

        <ion-col size="2" text-center>
          <ion-label>{{a.amountProduct}}</ion-label>
        </ion-col>

        <ion-col size="2">
          <ion-label>{{a.dateOrder | date}}</ion-label>
        </ion-col>

        <ion-col size="3" text-left>
          <ion-label>{{a.status}}</ion-label>

        </ion-col>
      </ion-item>
      <div *ngIf="a.status != 'null'">
        <ion-item-options side="end" #slidingItem>
          <ion-item-option expandable (click)="gotoOrderdetail(a.idOrder)">
            <ion-icon name="eye"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </div>
      <div *ngIf="a.status == 'สั่งซื้อ'">
        <ion-item-options side="end">
          <ion-item-option color="danger" expandable (click)="cancelorder(a.idOrder)">
            ยกเลิกสินค้า
          </ion-item-option>
          <ion-item-option expandable (click)="gotoOrderdetail(a.idOrder)">
            <ion-icon name="eye"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </div>
      <div *ngIf="a.status == 'รับสั่งซื้อ'">
        <ion-item-options side="end">
          <ion-item-option color="danger" expandable (click)="cancelorder(a.idOrder)">
            ยกเลิกสินค้า
          </ion-item-option>
          <ion-item-option expandable (click)="gotoOrderdetail(a.idOrder)">
            <ion-icon name="eye"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </div>
      <div *ngIf="a.status == 'ส่งสินค้า'">
        <ion-item-options side="end">
          <ion-item-option color="success" expandable (click)="sendorder(a.idOrder)">
            รับสินค้า
          </ion-item-option>
          <ion-item-option expandable (click)="gotoOrderdetail(a.idOrder)">
            <ion-icon name="eye"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </div>

    </ion-item-sliding>

  </ion-row>
  <!-- ///////////////////////////////////////////////////////// -->
  <pagination-controls (pageChange)="p = $event"   
  previousLabel="ย้อนกลับ"
  maxSize="5"
  nextLabel="ถัดไป"

  class="my-pagination"
  ></pagination-controls>

</ion-content> `
})
export class ListPage implements OnInit {
  p: number = 1
  dataOrder: Order;
  data
pp :any;
  datasearch: any = [];
  datasearch2: Order[] = [];

  // serarch :any;
  // serarch2 :Order[] = [];
  constructor(public productapi:ProductService,public route: Router, public callApi: CallApiService, public alertController: AlertController, public tost: ToastController) {
    this.getall();
  }

  ngOnInit() {
    this.getall();
    this.getdataarray();

  }
  ionViewDidEnter() {
    this.getdataarray()
  }
  //////////////////////////////////////////////////////////////
  setFilteredItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim()) {
      this.datasearch2 = this.datasearch2.filter((item) => {

        return (item.nameProduct.toLowerCase().indexOf(val.toLowerCase()) > -1);

      });
    } else {
      this.getdataarray();
    }
  }

  getdataarray() {
    this.callApi.GetListAllProduct().subscribe(it => {
      this.datasearch = it;
      for (var i in it) {
        this.datasearch2[i] = this.datasearch[i]
        console.log(this.datasearch2);
      }
    });
  }
  //////////////////////////////////////////////////////////////
  ///////////////// แจ้งเตือน/////////////////////////////////////
  async presentToast() {
    const toast = await this.tost.create({
      message: 'ยกเลิกการสั่งสินค้าเรียบร้อย',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  async presentToast1() {
    const toast = await this.tost.create({
      message: 'ยืนยันการรับสินค้าเรียบร้อย',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  ////////////////////////////////////////////////////////////
  /////////////////////////////ยกเลิก Order////////////////////////
  getid(id) {
    this.callApi.GetProductById(id).subscribe(it => {
      console.log(it);
      this.data = it
      console.log(this.data);
      this.cancelmorder(id)
    });

  }
  cancelmorder(id) {
    console.log(id);
    this.callApi.editokorder(id, this.data).subscribe(it => {
      this.data = it;
      console.log(this.data);      
      console.log(id);
      this.getdataarray();
      
      
    });
    this.productapi.CancelSellTotalProduct(this.data.idProduct, this.data.amountProduct).subscribe(it => {
      this.data = it;
      console.log(this.data);
      console.log(this.data.amountProduct);
      this.getdataarray();
      
    });

  }
  async cancelorder(id) {
    const alert = await this.alertController.create({
      header: 'ยกเลิกการสั่งซื้อ',

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
      header: 'ยืนยันรับสินค้า',
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
    this.callApi.GetProductById(id).subscribe(it => {
      console.log(it);
      this.data = it
      console.log(this.data);
      this.editsendorder(id)
    });
  }
  editsendorder(id) {
    this.callApi.editsendorder(id, this.data).subscribe(it => {
      this.data = it;
      console.log(it);
      this.getdataarray();
    });
  }
  /////////////////////////////////////////////////////////////////////////


  gotoOrder() {
    this.route.navigate(['/order']);
  }

  gotoOrderdetail(id) {
    this.route.navigate(['/orderdetail', { _id: id }]);
  }
  getall() {
    this.callApi.GetListAllProduct().subscribe(it => {
      this.dataOrder = it;
    })
  }


  ///////////////////////////////////////////////////////////////////



}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { Product } from '../Models/Product';
import { Order } from '../Models/Order';
import { log } from 'util';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  dataOrder: Order;
  data

  datasearch: any = [];
  datasearch2: Order[] = [];

  // serarch :any;
  // serarch2 :Order[] = [];
  constructor(public route: Router, public callApi: CallApiService, public alertController: AlertController, public tost: ToastController) {
    this.getall();
  }

  ngOnInit() {
    this.getall();
    this.getdataarray();

  }

  //////////////////////////////////////////////////////////////
  setFilteredItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() ) {
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
      console.log(this.datasearch);
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
      this.getall();
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
      this.getall();
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
      console.log(it);
      this.dataOrder = it;
      console.log(this.dataOrder);
    })
  }


  ///////////////////////////////////////////////////////////////////
}


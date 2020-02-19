import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { Product } from '../Models/Product';
import { Order } from '../Models/Order';
import { log } from 'util';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { ProductService } from '../product.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  p: number = 1
  dataOrder: Order;
  data;
  userName;
  pp: any;
  dataUser: any;
  checkstatus: any
  datausercheckstatus: any
  datasearch: any = [];
  datasearch2: Order[] = [];
  datafilter: Order[] = [];
  dataarray: Order[] = [];
  showReceiptData;
  
  // serarch :any;
  // serarch2 :Order[] = [];
  constructor(public actived: ActivatedRoute, public menuCtrl: MenuController, public productapi: ProductService, public route: Router, public callApi: CallApiService, public alertController: AlertController, public tost: ToastController) {


  }


  ngOnInit() {
    this.userName = this.callApi.nameUser
    console.log(this.userName);
    // this.getdatafilter();
    this.showdatafilter();
    this.callApi.GetUserbyData(this.userName).subscribe(it => {

      this.datausercheckstatus = it.statusUser
      console.log(this.datausercheckstatus);

    });
    this.showReceipt()



  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
    this.userName = this.callApi.nameUser
    console.log(this.userName);

    this.showdatafilter();
    this.getdataarray()
    this.showdatafilter();
    this.callApi.GetUserbyData(this.userName).subscribe(it => {
      this.datausercheckstatus = it.statusUser
      console.log(this.datausercheckstatus.statusUser);

    });

  }

  ///////////////////////////////////////sercht//////////////////////////////////////
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


  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////เอาข้อมูล Product มาทำเป็นอาเรย์////////////////////////////////
  getdataarray() {
    this.callApi.GetListAllProduct().subscribe(it => {
      this.datasearch = it;
      for (var i in it) {
        this.datasearch2[i] = this.datasearch[i]
        // console.log(this.datasearch2);
      }
    });
  }
  getdatafilter() {
    this.callApi.GetListAllProduct().subscribe(it => {
      this.dataOrder = it;
      console.log(this.dataOrder);
      for (let index = 0; index < Object.keys(this.dataOrder).length; index++) {
        this.datafilter[index] = this.dataOrder[index]
        this.dataarray[index] = this.datafilter[index]
      }
    });
  }
  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////เอาข้อมูล Order มาทำ filter แยกข้อมูล//////////////////////
  countdata
  showdatafilter() {
    this.callApi.GetOrderbyUsername(this.userName).subscribe(it => {
      this.dataUser = it
      console.log(this.dataUser);
      for (let index = 0; index < Object.keys(this.dataUser).length; index++) {
        this.datafilter[index] = this.dataUser[index]
      }
      this.countdata = Object.keys(this.datafilter).length
    });

  }
  ///////////////////////////////////////////////////////////////////////////////////////////
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
      console.log(it.idProduct);
      this.data = it
      console.log(this.data);
      this.cancelmorder(id)
    });

  }

  showReceipt() {
    this.callApi.GetReceiptAll().subscribe(it => {
      console.log(it);
      this.showReceiptData = it
    })
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

  async  gotoOrder1() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'ฟังก์ชั่นนี้ยังไม่เปิดให้ใช้บริการสำหรับบัญชีนี้  ',
      buttons: ['OK'],

    });

    await alert.present();

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


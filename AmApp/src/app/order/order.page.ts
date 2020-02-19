import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Order, receipt } from '../Models/Order';
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
  data1;
  sum: any
  datasum: any
  id: any;
  check: any;
  total: number;
  amountp: number;
  amountnumber: number;
  aamount: any
  ttotal: any
  isShowValidateName: any = false
  isShowValidatetelUser: any = false
  isShowValidateaddressUser: any = false
  isShowValidateamountProduct: any = false
  mirrorTotalProduct
  dataReceipt = {
    "idReceipt": null,
    "dataOrder": [],
    "date": null,
    "file": null,
    "status": null
  }
  dataReceiptInArray: receipt;
  oderReceipt: Order ;
  oderReceiptById: Order;
  constructor(public productapi: ProductService, public tost: ToastController, public alertController: AlertController, public alertController1: AlertController, public route: Router, public callApi: CallApiService, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.order = this.formbuilder.group({
      'idOrder': [null],
      'idProduct': [null],
      'nameProduct': [null],
      'amountProduct': [""],
      'priceOrder': [null],
      'nameUser': [""],
      'telUser': [""],
      'addressUser': [""],
      'dateOrder': [null],
      'sendDate': [null],
      'status': [null],
      'userOrder': [null],
      'totalProduct': [""]
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

  showOrderReceipt() {
    this.callApi.GetListAllProduct().subscribe(it => {
      console.log(it);
      this.oderReceipt = it
    })
  }

  AddList(data, amountp) {

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
      this.isShowValidateName = false;
      this.isShowValidatetelUser = false;
      this.isShowValidateaddressUser = false;
      this.isShowValidateamountProduct = false;
      console.log("จำนวน " + this.amountnumber);
      console.log("คงเหลือ " + this.total);
      console.log(amountp);
      console.log(this.data1.totalProduct);

      this.callApi.GetProductBydata(data).subscribe(it => {
        this.data1 = it
        this.data1.totalProduct = parseInt(this.data1.totalProduct) - amountp

        if (this.amountnumber <= this.total && this.amountnumber != 0) {
          // console.log('dai');
          // this.total = 0;
          // this.amountnumber = 0;
          // this.dataReceipt.dataOrder.push(this.order.value)
          // console.log(this.dataReceipt);
          // this.dataReceipt.dataOrder;
          // this.order.reset()
          this.callApi.AddOrder(this.dataorder).subscribe(it => {
            this.showOrderReceipt()    
            // console.log(it);
            // console.log(this.order.value.idProduct);
            // console.log(this.order.value);
          });
          this.productapi.AddSellTotalProduct(this.order.value.idProduct, this.order.value).subscribe(it => {
            console.log(it);
          });
          // this.amountp = null
          // this.sum = null
          // this.presentToast1();            
          this.showOrderReceipt()

        }
        else if (this.amountnumber == 0) {
          this.presentAlert2();


          this.total = 0;
          this.amountnumber = 0;
        }
        else if (amountp > this.data1.totalProduct) {
          this.presentAlert1();
          // this.total = 0;
          // this.amountnumber = 0;
        }

        // if (this.amountnumber < this.ttotal) {
        //   this.data1.totalProduct = parseInt(this.data1.totalProduct) - amountp
        // }      

      });
      // else if (this.amountnumber > this.data1.totalProduct) {
      //   this.presentAlert1();

      //   this.total = 0;
      //   // this.amountnumber = 0;
      // }
    });
  }

  addReceipt() {
    this.showOrderReceipt()   
    console.log(this.oderReceipt); 
    this.dataReceipt.file = "ไม่พบไฟล์"    
    for (let index = 0; index < Object.keys(this.oderReceipt).length; index++) {      
      this.dataReceipt.dataOrder[index] = this.oderReceipt[index]      
    }
    this.dataReceiptInArray = this.dataReceipt
    console.log(this.dataReceiptInArray);    
    this.callApi.AddReceipt(this.dataReceiptInArray).subscribe(it => {
      console.log(it);
    });
  }

  PopList(id) {
    console.log(id);    
    this.callApi.GetProductById(id).subscribe(it => {
      console.log(it);
      this.oderReceiptById = it
      console.log(this.oderReceiptById);
      
      this.productapi.CancelSellTotalProduct(this.oderReceiptById.idProduct, this.oderReceiptById.amountProduct).subscribe(it => {      
      console.log(it);

      this.callApi.DeleteOrder(id).subscribe(it => {
        this.showOrderReceipt()      
      });
    });
    })
    
    
    
  }


  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     header: '',
  //     message: '<strong>ยืนยันการสั่งซื้อ</strong>',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'ok',
  //         handler: () => {
  //           this.order.value.userOrder = this.callApi.nameUser
  //           console.log(this.order.value.userOrder);

  //           this.dataorder = this.order.value;
  //           console.log(this.dataorder);

  //           this.callApi.GetProductid(this.dataorder.idProduct).subscribe(it => {
  //             this.ttotal = it.totalProduct
  //             this.aamount = this.dataorder.amountProduct
  //             this.amountnumber = parseInt(this.aamount, this.amountnumber)
  //             this.total = parseInt(this.ttotal, this.total)
  //             console.log(it);
  //             this.isShowValidateName = false;
  //             this.isShowValidatetelUser = false;
  //              this.isShowValidateaddressUser = false;
  //             this.isShowValidateamountProduct = false;
  //             console.log("จำนวน " + this.amountnumber);
  //             console.log("คงเหลือ " + this.total);

  //             if (this.amountnumber <= this.total && this.amountnumber != 0 && this.dataorder.nameUser != "" && this.dataorder.telUser != "" && this.dataorder.addressUser != "") {
  //               // console.log('dai');
  //               this.total = 0;
  //               this.amountnumber = 0;                 
  //               this.dataReceipt.dataOrder.push(this.order.value) 
  //               console.log(this.dataReceipt);
  //               this.dataReceipt.dataOrder;            
  //               // this.callApi.AddOrder(this.dataorder).subscribe(it => {
  //               //   // console.log(it);
  //               //   // console.log(this.order.value.idProduct);
  //               //   // console.log(this.order.value);
  //               // });
  //               // this.productapi.AddSellTotalProduct(this.order.value.idProduct, this.order.value).subscribe(it => {
  //               //   // console.log(it);
  //               // });
  //               // this.amountp = null
  //               // this.sum = null
  //               // this.presentToast1();
  //               // this.route.navigate(['/list']);


  //             }
  //             else if (this.amountnumber == 0) {
  //               this.presentAlert2();


  //               this.total = 0;
  //               this.amountnumber = 0;
  //             }
  //             else if (this.amountnumber > this.total) {
  //               this.presentAlert1();

  //               this.total = 0;
  //               this.amountnumber = 0;
  //             }
  //             else {
  //               this.presentAlert3();
  //               if (this.dataorder.nameUser == "") {
  //                 console.log("name");
  //                 this.isShowValidateName = true;
  //               }
  //               if (this.dataorder.telUser == "") {
  //                 console.log("เทล");
  //                 this.isShowValidatetelUser = true;
  //               }
  //               if (this.dataorder.addressUser == "") {
  //                 console.log("แอดเดส");
  //                 this.isShowValidateaddressUser = true;
  //               }
  //               if(this.dataorder.amountProduct == ""){
  //                 this.isShowValidateamountProduct = true
  //                 console.log("amount");
  //               }
  //               if(this.dataorder.amountProduct == null){
  //                 this.isShowValidateamountProduct = true
  //                 console.log("amount");
  //               }

  //             }

  //           });


  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  ngOnInit() {
    this.listdata()
    this.showOrderReceipt()
  }

  listdata() {
    this.callApi.getallproduct().subscribe(it => {

      this.dataProduct = it;
      console.log(this.dataProduct);

      console.log(it.total);

    })
  }
  getbydata(data) {
    this.callApi.GetProductBydata(data).subscribe(it => {
      this.data1 = it
      console.log(it);

      this.datasum = it
      if (it.totalProduct == "0") {
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
    console.log(qs);

    // console.log(this.datasum);
    // console.log(q);
    this.sum = qs * this.datasum.priceProduct
    // console.log(this.sum);

  }
}

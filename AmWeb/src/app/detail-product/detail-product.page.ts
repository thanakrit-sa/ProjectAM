import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Order } from 'src/Models/order';
import { Router, ActivatedRoute } from '@angular/router';
import { CallApiService } from 'src/app/service/call-api.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  idOrder;idProduct;nameProduct;amount;price;nameUser;tel;address;date;status;file;
 
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
 
  ) 
  {
   
  }
 
  ngOnInit() {
    console.table(this.navParams);
    this.idOrder = this.navParams.data.idOrder;
    this.idProduct = this.navParams.data.idProduct;
    this.nameProduct = this.navParams.data.nameProduct;
    this.amount = this.navParams.data.amount;
    this.price = this.navParams.data.price;
    this.nameUser = this.navParams.data.nameUser;
    this.tel = this.navParams.data.tel;
    this.address = this.navParams.data.address;
    this.date = this.navParams.data.date;
    this.status = this.navParams.data.status;
    this.file = this.navParams.data.file;
  }
 

}

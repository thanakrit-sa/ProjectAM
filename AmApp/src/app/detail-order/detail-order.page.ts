import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CallApiService } from '../call-api.service';
import { Order, receipt } from '../Models/Order';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {

  id;idProduct;nameProduct;amountProduct;priceOrder;nameUser;telUser;addressUser;
  dataOrder:Order;

  constructor
    (private modalController: ModalController, private navParams: NavParams, public callApi: CallApiService) {
    this.id = this.navParams.data.id;
    console.log(this.id);
  }

  ngOnInit() {
    this.showData()
  }

  showData() {

    this.callApi.GetProductById(this.id).subscribe(it => {
      console.log(it);
      this.dataOrder = it
      this.idProduct = this.navParams.data.idProduct;
      this.nameProduct = this.navParams.data.nameProduct;
      this.amountProduct = this.navParams.data.amountProduct;
      this.priceOrder = this.navParams.data.priceOrder;
      this.nameUser = this.navParams.data.nameUser;
      this.telUser = this.navParams.data.telUser;
      this.addressUser = this.navParams.data.addressUser;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Order } from '../Models/Order';
import { Router, ActivatedRoute } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ProductService } from "../product.service";

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.page.html',
  styleUrls: ['./orderdetail.page.scss'],
})
export class OrderdetailPage implements OnInit {

  dataOrder: Order;
  data: any;


  constructor(public api:ProductService,public route: Router, public callApi: CallApiService, public activate: ActivatedRoute, public formbuilder: FormBuilder ,public alertController:AlertController) {
    this.data = this.activate.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.callApi.GetProductById(this.data).subscribe(it => {
      console.log(it);
      this.dataOrder = it
      console.log(this.dataOrder);
    });

  } 

  addFile(id) {
    console.log(id);  
    console.log(this.api.imageName);
    console.log(this.dataOrder);
    
    this.dataOrder.file = this.api.imageName;
    this.callApi.editAddFile(id,this.dataOrder).subscribe(it => {      
      console.log(it);
    });
  }

  editsendorder(id){
    this.callApi.editsendorder(id,this.dataOrder).subscribe(it => {
      this.dataOrder = it;
      console.log(it);
  });
  }
  async alert(id) {
        const alert = await this.alertController.create({
          header: 'ยืนยันการส่งของ',
      
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
               this.editsendorder(id)
            
              }
            }
          ]
        });
      
        await alert.present();
      }
      async alertAddFile(id) {
        const alert = await this.alertController.create({
          header: 'ต้องการแนบหลักฐานการโอนเงินใช่หรือไม่ ?',
      
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
               this.addFile(id)
            
              }
            }
          ]
        });
      
        await alert.present();
      }

      
}

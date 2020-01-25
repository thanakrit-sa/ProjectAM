import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public dataProductAll :product;
  datafilter:product[] = [];
  filtertype:product[] = [];

  constructor(public alertController: AlertController,public activate: ActivatedRoute,public userApi:UserService, public productApi: ProductService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    console.log(this.userApi.statusAdmin);
    console.log(this.userApi.nameAdmin);
    
   }

  ngOnInit() {
    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataProductAll = it;
      for (let index = 0; index < Object.keys(this.dataProductAll).length; index++) {
        this.datafilter[index] = this.dataProductAll[index];
      }
      this.filtertype = this.datafilter;
      console.log(this.filtertype);
      console.log(this.dataProductAll);
      console.log(this.datafilter);
      
      
      
      
    });
  }

  async ConfirmDelete(idProduct) {
    const alert = await this.alertController.create({      
      message: 'ต้องการที่จะลบสินค้าหรือไม่ ?',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.deleteDataProduct(idProduct);
            console.log('Confirm Okay');
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',          
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewDidEnter(){
    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataProductAll = it;
      for (let index = 0; index < Object.keys(this.dataProductAll).length; index++) {
        this.datafilter[index] = this.dataProductAll[index];
      }
      this.filtertype = this.datafilter;
      console.log(this.filtertype);
      console.log(this.dataProductAll);
      console.log(this.datafilter);
      
      
      
      
    });
  }
  
  deleteDataProduct(idProduct) {
    this.productApi.DeleteDataPeoduct(idProduct).subscribe(it => {
      this.productApi.GetProductAll().subscribe((it) => {
        console.log(it);
        this.dataProductAll = it;
        console.log(this.dataProductAll);

      });
    });
  }

  public EditDataProduct(id) {
    this.route.navigate(['/edit-product', { _id: id }]);
  }

  filter(){
    this.datafilter = this.filtertype.filter(it => it.typeProduct == "อาหาร");
    
  }
}

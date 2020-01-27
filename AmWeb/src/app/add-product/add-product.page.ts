import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  dataProduct: FormGroup;
  submit: boolean = false;
  isShowValidate:boolean = false;
  dataPd: product;
  constructor(public alertController: AlertController, public productApi: ProductService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataProduct = this.formbuilder.group({
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      'typeProduct': [null, Validators.required],
      'priceProduct': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      'costProduct': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.required])]
    });
  }

  get f() { return this.dataProduct.controls; }

  ngOnInit() {
  }

  // ------------------------------------------------------------------------------------- Validation

  public errorMessages = {
    costProduct: [
      { type: 'required', message: 'กรุณากรอกราคาต้นทุน' },
      { type: 'pattern', message: 'กรุณากรอกราคาต้นทุนให้ถูกต้อง 0-9' }
    ],
    priceProduct: [
      { type: 'required', message: 'กรุณากรอกราคาสินค้า' },
      { type: 'pattern', message: 'กรุณากรอกราคาสินค้าให้ถูกต้อง 0-9' }
    ],
    typeProduct: [
      { type: 'required', message: 'กรุณาเลือกชนิดสินค้า' }
    ],
    nameProduct: [
      { type: 'required', message: 'กรุณากรอกชื่อสินค้าสินค้า' }
    ],
    idProduct: [
      { type: 'required', message: 'กรุณากรอกรหัสสินค้าสินค้า' }
    ]
  };
  get idProduct() {
    return this.dataProduct.get("idProduct");
  }
  get nameProduct() {
    return this.dataProduct.get("nameProduct");
  }
  get typeProduct() {
    return this.dataProduct.get("typeProduct");
  }
  get priceProduct() {
    return this.dataProduct.get("priceProduct");
  }
  get costProduct() {
    return this.dataProduct.get("costProduct");
  }  

  check() {
    if (this.dataProduct.value.nameProduct == null && this.dataProduct.value.totalProduct == null && this.dataProduct.value.idProduct == null && this.dataProduct.value.typeProduct == null
      && this.dataProduct.value.priceProduct == null && this.dataProduct.value.costProduct == null) {
      this.isShowValidate = true;            
    }    
    // else if (this.dataProduct.value.nameProduct != null && this.dataProduct.value.totalProduct == null && this.dataProduct.value.idProduct == null && this.dataProduct.value.typeProduct == null
    //   && this.dataProduct.value.priceProduct == null && this.dataProduct.value.costProduct == null){      
    //   this.isShowValidate = true;          
    // }   
    // else if (this.dataProduct.value.nameProduct == null && this.dataProduct.value.totalProduct != null && this.dataProduct.value.idProduct == null && this.dataProduct.value.typeProduct == null
    //   && this.dataProduct.value.priceProduct == null && this.dataProduct.value.costProduct == null){      
    //   this.isShowValidate = true;          
    // } 
    // else if (this.dataProduct.value.nameProduct == null && this.dataProduct.value.totalProduct == null && this.dataProduct.value.idProduct != null && this.dataProduct.value.typeProduct == null
    //   && this.dataProduct.value.priceProduct == null && this.dataProduct.value.costProduct == null){      
    //   this.isShowValidate = true;          
    // } 
    // else if (this.dataProduct.value.nameProduct == null && this.dataProduct.value.totalProduct == null && this.dataProduct.value.idProduct == null && this.dataProduct.value.typeProduct != null
    //   && this.dataProduct.value.priceProduct == null && this.dataProduct.value.costProduct == null){      
    //   this.isShowValidate = true;          
    // } 
    // else if (this.dataProduct.value.nameProduct == null && this.dataProduct.value.totalProduct == null && this.dataProduct.value.idProduct == null && this.dataProduct.value.typeProduct == null
    //   && this.dataProduct.value.priceProduct != null && this.dataProduct.value.costProduct == null){      
    //   this.isShowValidate = true;          
    // } 
    // else if (this.dataProduct.value.nameProduct == null && this.dataProduct.value.totalProduct == null && this.dataProduct.value.idProduct == null && this.dataProduct.value.typeProduct == null
    //   && this.dataProduct.value.priceProduct == null && this.dataProduct.value.costProduct != null){      
    //   this.isShowValidate = true;          
    // } 
    else {
      this.isShowValidate = false; 
      this.ConfirmInsert();
      console.log("false");  
    }
  }

  // ------------------------------------------------------------------------------------- Insert

  async ConfirmInsert() {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะเพิ่มสินค้าหรือไม่ ?',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.log();
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

  log() {

    console.log(this.dataProduct.value);
    console.log(this.dataProduct);
    this.dataPd = this.dataProduct.value;
    this.productApi.AddDataProduct(this.dataPd).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/product']);
  }
}

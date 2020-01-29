import { Component, OnInit, IterableDiffers } from '@angular/core';
import { StoreService } from '../service/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from 'src/Models/product';
import { stock } from 'src/Models/stock';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clear-store',
  templateUrl: './clear-store.page.html',
  styleUrls: ['./clear-store.page.scss'],

})
export class ClearStorePage implements OnInit {

  dataproduct: product;
  inputcheck: boolean;
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkBoxList: any;
  PageNumber = 1;
  sumProductNumber: number;
  ss: any = []
  test = [];
  test2 = [];
  public dataStoreAll: product;
  datafilter: product[] = [];
  filtertype: product[] = [];
  filterData: any[] = []
  stockMounth = {
    "idStock": null,
    "dataProductPerMonth": [],
    "stockPerMonth": null
  }
  stockMounth2: product;
  idproducteditstatus: any

  stockTest: stock

  isShowButton: boolean = false;
  isShowButtonDisabled: boolean = false;
  isShowContentStock: boolean = false;
  isShowContentStockPerMonth: boolean = false;
  isShowButtonCheck: boolean = false;
  isShowButtonBack: boolean = false;
  getShowStockAll;
  textPerStock:string;
  constructor(public alertController: AlertController, public storeapi: StoreService, public productApi: ProductService, public route: Router) {
    console.log(this.stockMounth);

  }

  async Confirm() {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะตัดสต๊อกใช่หรือไม่',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.filter();            
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

  checkMaster() {
    setTimeout(() => {
      this.datafilter.forEach(obj => {
        obj.statusCheck = this.masterCheck;
      });
    });
  }
  checkEvent() {
    const totalItems = this.datafilter.length;
    let checked = 0;
    this.datafilter.map(obj => {
      if (obj.statusCheck) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
    if (this.datafilter.filter(it => it.statusCheck == false)) {
      this.isShowButton = true
      this.isShowButtonDisabled = true;
    }
    else {
      this.isShowButton = false

    }
    console.log(this.isShowButton);
  }


  num: any[] = []

  sss() {
    this.num = this.checkBoxList.forEach(it => {
      (it.checkBoxList) == true
      console.log(this.num);

    });


  }

  filter() {
    console.log(this.stockMounth);

    this.filterData = this.datafilter.filter(it => it.statusCheck == true)
    console.log(this.filterData);
    console.log(this.datafilter.filter(it => it.statusCheck)); 
    for (let index = 0; index < Object.keys(this.filterData).length; index++) {
      this.stockMounth.dataProductPerMonth[index] = this.filterData[index];
      // this.stockMounth2 = this.stockMounth;
    }
    this.stockTest = this.stockMounth
    console.log(this.stockTest);
    this.productApi.AddStockTest(this.stockTest).subscribe(it => {
      console.log(it);
    });    
    this.closeContent();
    this.showContent();
    this.isShowButton = false;
    }


  ////////////////////////////////////////////////////////////////*//////////////////////
  showall() {
    this.productApi.GetProductAll().subscribe((it) => {
      this.dataStoreAll = it;
      console.log(this.dataStoreAll);
      for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
        this.datafilter[index] = this.dataStoreAll[index];
        this.filtertype[index] = this.datafilter[index];
        this.sumProductNumber = Object.keys(this.datafilter).length;
        console.log(this.filtertype[index]);
        console.log(this.datafilter[index]);
      }
    });
  }

  // addstock(){    
  //      console.log(this.dataStoreAll);

  //   this.productApi.AddStock(this.dataStoreAll).subscribe(it => {
  //     console.log(it);
  //   });
  //   this.route.navigate(['/product']);
  // }  

  onChange(data) {
    if (data == "ทั้งหมด") {
      this.showall()
      console.log(this.dataStoreAll);
    }
    else {
      this.datafilter = this.filtertype.filter(it =>
        it.statusProduct == data)
      console.log(this.dataStoreAll);
    }
  }



  public get(id) {
    this.route.navigate(['/edit-clear', { _id: id }]);
  }
  ngOnInit() {
    this.showall();
    console.log(this.datafilter);
    console.log(this.filterData);
    this.check = 0;
    this.sumProductNumber
    console.log(this.isShowButton);
    this.getShowStock();      
  }
  ionViewDidEnter(){
    this.getShowStock();   
  }
  check = 0

  show() {
    this.check = 1

  }
  return() {
    this.check = 0
  }


  showinput(statusinput) {
    console.log(statusinput);
    this.dataproduct = statusinput
    statusinput.buttonCheck = "check";
  }

  dropdown(data) {
    console.log(data);
    this.dataproduct.statusProduct = data
  }

  updateinput(data) {
    data.buttonCheck = null
    this.idproducteditstatus = this.dataproduct.idProduct
    console.log(this.dataproduct);
    console.log(this.idproducteditstatus);

    this.productApi.EditProductstatus(this.idproducteditstatus, this.dataproduct).subscribe(it => {
      console.log(it);

    })
  }

  showContent() {
    this.isShowContentStock = true;
    this.isShowContentStockPerMonth = true;
    this.isShowButtonBack = true;
    this.isShowButtonDisabled = true;
    this.isShowButtonCheck = true;
  }
  closeContent() {
    this.isShowContentStock = false;
    this.isShowContentStockPerMonth = false;
    this.isShowButtonBack = false;
    this.isShowButtonDisabled = false;
    this.isShowButtonCheck = false;
  }

  getShowStock(){
    this.productApi.GetStockAll().subscribe(it => {
      this.getShowStockAll = it
      console.log(this.getShowStockAll);
    })
  }
  
  

}

import { Component, OnInit, IterableDiffers } from '@angular/core';
import { StoreService } from '../service/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from 'src/Models/product';
import { stock } from 'src/Models/stock';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-clear-store',
  templateUrl: './clear-store.page.html',
  styleUrls: ['./clear-store.page.scss'],

})
export class ClearStorePage implements OnInit {

  a: boolean = false;
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
  showDataFilter: any[] = [];
  stockTest: stock

  isShowButton: boolean = false;
  isShowButtonDisabled: boolean = false;
  isShowContentStock: boolean = false;
  isShowContentStockPerMonth: boolean = false;
  isShowButtonCheck: boolean = false;
  isShowButtonBack: boolean = false;
  isShowButtonBack2: boolean = false;
  isShowContentStockDetail: boolean = false;
  isShowProductZero: boolean = false;
  isShowDate: boolean = false;
  isShowButtonUpdate: boolean = false;

  sumProductList: number;
  sumProductIn: number;
  sumProductTotal: number;
  sumProductSell: number;
  productIn; productTotal; productSell;

  getShowStockAll;
  textPerStock: string;
  testStock;
  isIdStock;
  thistest2: stock[] = [];
  ttt; q;
  w: stock[] = [];
  e;

  dataStock: stock;

  datatest = {
    "idStock": null,
    "dataProductPerMonth": [],
    "stockPerMonth": null
  };

  showData: stock[] = [];
  testa: stock[] = [];
  showDate

  splitted; isGetMonth; monthNow; dateNow; splittedYear; isGetYear; yearNow; updateData; updateId; updateDataAll: stock;


  constructor(public actionSheetController: ActionSheetController, public alertController: AlertController, public storeapi: StoreService, public productApi: ProductService, public route: Router) {
    console.log(this.stockMounth);
    this.getShowStockAll = null;
  }

  async Confirm() {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะตัดสต๊อกใช่หรือไม่',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            // if () {
            this.getShowStock()
            this.getMonth();
            this.isShowButton = false;
            this.isShowButtonDisabled = true;
            // }

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
        console.log(this.masterCheck);
      });
    });
  }

  getMonth() {
    this.getShowStockAll = null;
    this.productApi.GetStockAll().subscribe(it => {
      this.getShowStockAll = it
      let date: Date = new Date();
      console.log(date);
      for (let index = 0; index < this.getShowStockAll.length; index++) {
        console.log(this.getShowStockAll[index].stockPerMonth);
        this.splitted = this.getShowStockAll[index].stockPerMonth.split("/", 3);
        console.log(this.splitted[2]);
        this.splittedYear = this.splitted[2].split(" ", 3);
        this.isGetYear = this.splittedYear[0];
        this.isGetMonth = this.splitted[0]
        console.log(this.getShowStockAll.idStock);
      }
      this.dateNow = date.getMonth();
      this.monthNow = this.dateNow + 1;
      console.log(this.monthNow);
      this.yearNow = date.getFullYear();
      console.log(this.yearNow);

      if (this.getShowStockAll.length == 0) {
        this.filter();
      } else if (this.isGetMonth == this.monthNow && this.isGetYear == this.yearNow) {
        console.log("Success 1");
      } else if (this.isGetMonth != this.monthNow && this.isGetYear != this.yearNow) {
        this.filter();
      }
    })
  }

  checkUpdate() {
    if (this.isGetMonth == this.monthNow && this.isGetYear == this.yearNow) {
      this.updateData = this.datafilter.filter(it => it.statusCheck == true)
      console.log(this.updateData);
      this.productApi.GetStock(this.isGetMonth, this.isGetYear).subscribe(it => {
        this.updateId = it
        console.log(this.updateId.idStock);
        this.updateDataAll = this.updateData;
        console.log(this.updateDataAll);
        
        for (let index = 0; index < Object.keys(this.updateData).length; index++) {
          this.stockMounth.dataProductPerMonth[index] = this.updateData[index];          
        }
        this.updateDataAll = this.stockMounth;
        this.productApi.UpdateStock(this.updateId.idStock, this.updateDataAll).subscribe(it => {
          console.log(it);
        })
      })      
    }
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

      if (this.getShowStockAll.length == 0) {
        this.isShowButton = true
        this.isShowButtonUpdate = false
      } else if (this.isGetMonth == this.monthNow && this.isGetYear == this.yearNow) {
        this.isShowButton = false
        this.isShowButtonUpdate = true
      } else if (this.isGetMonth != this.monthNow && this.isGetYear != this.yearNow) {
        this.isShowButton = true
        this.isShowButtonUpdate = false
      }
    }
    // else {
    //   if(this.isGetMonth == this.monthNow && this.isGetYear == this.yearNow){
    //     this.isShowButton = true        
    //   } else if(this.isGetMonth != this.monthNow && this.isGetYear != this.yearNow){
    //     this.isShowButton = false
    //   }
    // }

  }

  ngOnInit() {
    this.showall();
    console.log(this.datafilter);
    console.log(this.filterData);
    this.check = 0;
    this.sumProductNumber
    console.log(this.isShowButton);
    this.getShowStock();
    // this.productApi.DeleteDataPeoduct(this.q).subscribe(it => {
    //   console.log(it);
    // });

  }

  filter() {

    console.log(this.stockMounth);

    this.filterData = this.datafilter.filter(it => it.statusCheck == true)
    console.log(this.filterData);
    console.log(this.datafilter.filter(it => it.showTotal == 0));

    console.log(this.datafilter.filter(it => it.statusCheck));
    for (let index = 0; index < Object.keys(this.filterData).length; index++) {
      this.stockMounth.dataProductPerMonth[index] = this.filterData[index];
      // this.stockMounth2 = this.stockMounth;
      this.testa[index] = this.filterData[index].idProduct;
      this.w[index] = this.filterData[index];
      console.log(this.testa[index]);
      this.q = this.testa[index];
      this.e = this.w[index];
      console.log(this.q);
      console.log(this.e);

      this.productApi.EditNumber(this.q, this.e).subscribe(it => {
        console.log(it);
      });
    }


    // this.productApi.EditNumber(this.testa,this.filterData).subscribe(it => {
    //   console.log(it);
    // });
    this.stockTest = this.stockMounth
    console.log(this.stockTest);
    this.productApi.AddStockTest(this.stockTest).subscribe(it => {
      console.log(it);
    });
    // this.closeContent();
    // this.showContent();
    // this.isShowButton = false;
    this.getShowStock()


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
        console.log(this.datafilter[index].showTotal == 0);
        this.showDataFilter[index] = this.datafilter[index].showTotal == 0;
        console.log(this.showDataFilter[index]);

        // if (this.datafilter[index].showTotal == 1) {
        //   this.datafilter[index].idProduct = "ตัดสต๊อกแล้ว"
        //   this.datafilter[index].nameProduct  = "ตัดสต๊อกแล้ว"
        //   this.datafilter[index].totalProduct  = "ตัดสต๊อกแล้ว"
        //   this.datafilter[index].amountProduct  = "ตัดสต๊อกแล้ว"
        //   this.datafilter[index].total  = "ตัดสต๊อกแล้ว"
        //   this.datafilter[index].statusProduct  = "ตัดสต๊อกแล้ว"
        // }
      }
      this.showDataFilter = this.datafilter.filter(it => it.showTotal == 0);
      console.log(this.showDataFilter);
      console.log(this.showDataFilter.length);
      if (this.showDataFilter.length == 0) {
        this.isShowProductZero = true;

      }

      // if(){

      // }

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

  //   showFilter(){
  //     this.showDataFilter = this.datafilter.filter(it => it.showTotal == 0)  
  //     console.log(this.showDataFilter);      
  // //     for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
  // //       this.showDataFilter[index] = this.dataStoreAll[index];

  // //     }
  // // console.log(this.showDataFilter);

  //   }


  public get(id) {
    this.route.navigate(['/edit-clear', { _id: id }]);
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
    this.isShowButtonBack2 = false;
    this.isShowContentStockDetail = false;
    this.isShowButton = false;
    this.isShowButtonUpdate = false;
  }
  closeContent() {
    this.isShowContentStock = false;
    this.isShowContentStockPerMonth = false;
    this.isShowButtonBack = false;
    this.isShowButtonDisabled = false;
    this.isShowButtonCheck = false;
    this.isShowContentStockDetail = false;
    this.isShowButtonBack2 = false;
    this.isShowButton = false;
  }
  closeContent2() {
    this.isShowContentStockDetail = true;
    this.isShowContentStock = true;
    this.isShowContentStockPerMonth = true;
    this.isShowButtonBack = false;
    this.isShowButtonDisabled = true;
    this.isShowButtonCheck = true;
    this.isShowContentStockPerMonth = false;
    this.isShowButtonBack2 = true;
    this.isShowButton = false;
  }
  getShowStock() {
    this.getShowStockAll = null;
    this.productApi.GetStockAll().subscribe(it => {
      this.getShowStockAll = it
      console.log(this.getShowStockAll);

    })

  }
  getShowDetailStock(id) {
    this.productApi.GetStockByid(id).subscribe(it => {
      this.dataStock = it
      console.log(this.dataStock);
      this.datatest = this.dataStock;

      for (let index = 0; index < this.datatest.dataProductPerMonth.length; index++) {
        this.showData[index] = this.datatest.dataProductPerMonth[index];
        console.log(this.showData[index]);

        this.productIn = this.datatest.dataProductPerMonth.map(it => it.total);
        console.log(this.productIn);
        this.sumProductIn = 0;
        for (let index = 0; index < this.productIn.length; index++) {
          this.sumProductIn += parseInt(this.productIn[index]);
        }
        console.log(this.sumProductIn);

        this.productTotal = this.datatest.dataProductPerMonth.map(it => it.totalProduct);
        console.log(this.productTotal);
        this.sumProductTotal = 0;
        for (let index = 0; index < this.productTotal.length; index++) {
          this.sumProductTotal += parseInt(this.productTotal[index]);
        }
        console.log(this.sumProductTotal);

        this.productSell = this.datatest.dataProductPerMonth.map(it => it.amountProduct);
        console.log(this.productSell);
        this.sumProductSell = 0;
        for (let index = 0; index < this.productSell.length; index++) {
          this.sumProductSell += parseInt(this.productSell[index]);
        }
        console.log(this.sumProductSell);
      }
      this.sumProductList = this.datatest.dataProductPerMonth.length;
    });
    this.closeContent2();
  }
}

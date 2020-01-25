import { Component, OnInit, IterableDiffers } from '@angular/core';
import { StoreService } from '../service/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from 'src/Models/product';
import { dataStockPerMonth } from 'src/Models/stock';


@Component({
  selector: 'app-clear-store',
  templateUrl: './clear-store.page.html',
  styleUrls: ['./clear-store.page.scss'],

})
export class ClearStorePage implements OnInit {

  public dataStoreAll: product;
  datafilter: product[] = [];
  filtertype: product[] = [];
  filterData: any[] = []
  stockMounth = {
    "idStock": null,
    "dataProductPerMonth": [],
    "stockPerMonth": null
    
  }
  isShowButton: boolean = false;
  stockMounth2: product;
  idproducteditstatus: any

  constructor(public storeapi: StoreService, public productApi: ProductService, public route: Router) {
    console.log(this.stockMounth);

  }
  dataproduct: product;
  inputcheck: boolean;
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkBoxList: any;
  PageNumber = 1;
  sumProductNumber:number;
  ss: any = []
  test = [];
  test2 = [];
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
    }
    else{
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
    // console.log(this.stockMounth2);
    
    


    this.productApi.AddStock2(this.stockMounth2).subscribe(it => {

      this.route.navigate(['/product']);
    });


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


}

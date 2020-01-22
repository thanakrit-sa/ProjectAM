import { Component, OnInit } from '@angular/core';
import { StoreService } from "src/app/service/store.service";
import { store } from 'src/Models/stroe';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { product } from 'src/Models/product';
import { ProductService } from "src/app/service/product.service";
@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  dataStore: FormGroup;
  setdate: string = "2020-02-16T13:51:48.9265091+07:00";
  dataSt: store;
  data;
  datas: product;
  datass: product[] = [];
  datasss: product[] = [];
  // IdclearStore: any;  
  isShow: boolean = false;
  // a;
  datafilter: store[] = [];
  total;
  // sum;  
  // filter: store[] = [];
  public dataStoreAll: store;
  public arr: store[] = [];
  public datashow: store[] = [];
  public chartLabel: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  month: string[] = [];
  splitted;
  getmonth: string;
  sumAmountProductInStore: number = 0;
  sumAmountProductSellInStore: number = 0;

  datashowfilter: product[] = [];
  filtertype: store[] = [];  

  constructor(public api: ProductService, public alertController: AlertController, public activate: ActivatedRoute, public storeApi: StoreService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataStore = this.formbuilder.group({
      'idStore': [null, Validators.required],
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      'unitProduct': [null, Validators.required],
      'unitTotal': [null, Validators.required],
      'sellProduct': [null, Validators.required],
      'total': [null, Validators.required]
    });
  }

  ngOnInit() {
    // this.get();
    this.showall();
  }

  ionViewDidEnter() {
    this.get();
    this.get2();
  }


  public EditStore(id) {
    this.route.navigate(['/edit-store', { _id: id }]);
  }

  // -----------------------------------------------------------------------------

  get2() {
    this.api.GetProductAll().subscribe((it) => {
      console.log(it);
      this.datas = it;
      for (let index = 0; index < Object.keys(this.datas).length; index++) {
        this.datass[index] = this.datas[index];
        this.datasss = this.datass;
        console.log(this.datasss[index]);
      }
    });
  }

  // -------------------------------------------------------------------------------

  get() {
    this.storeApi.GetProductStore().subscribe((it) => {
      console.log(it);
      this.dataStoreAll = it;
      for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
        this.datafilter[index] = this.dataStoreAll[index];
        this.total = this.datafilter[index].unitProduct;
        console.log(this.total);
        console.log(this.datafilter[index].addProductStore);
        // this.splitted = this.datafilter[index].addProductStore.split("-", 3);
        // console.log(this.splitted);
        // this.getmonth = this.splitted[1]
        // console.log(this.getmonth);

        // ---------- TEst ----------
        this.splitted = this.setdate.split("-", 3)
        console.log(this.splitted);
        console.log(this.splitted[1]);
        for (let index = 0; index < Object.keys(this.chartLabel).length; index++) {
          console.log(this.chartLabel[index]);
        }
        if (this.splitted[1] == this.chartLabel[index]) {
          this.api.GetProductAll().subscribe((it) => {
            console.log(it);
            this.datas = it;
            for (let index = 0; index < Object.keys(this.datas).length; index++) {
              this.sumAmountProductInStore = this.sumAmountProductInStore + parseInt(this.datas[index].total);
              console.log(this.sumAmountProductInStore);
            }
            for (let index = 0; index < Object.keys(this.datas).length; index++) {
              this.sumAmountProductSellInStore = this.sumAmountProductSellInStore + parseInt(this.datas[index].amountProduct);
              console.log(this.sumAmountProductSellInStore);
            }
          });
        }
      }
      console.log(this.dataStore.value);
    });
  }

  // ----------------------------------------------------------------------------------

  public ClearStores(id) {
    // console.log(this.IdclearStore);
    this.storeApi.GetProductStoreByid(id).subscribe(it => {
      console.log(it);
      this.dataSt = it
      console.log(this.dataSt);
      this.storeApi.ClearDataStore(id, this.dataSt).subscribe(it => {
        console.log(it);
      });
    });
  }

  // --------------------------------------------------------------------------------------

  setShow() {
    if (this.isShow == true) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  // -----------------------------------------------------------------------------------------

  editlog() {
    this.dataSt = this.dataStore.value
    this.storeApi.EditDataStore(this.dataStoreAll.idProduct, this.dataSt).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/store']);
  }

  // ------------------------------------------------------------------------------------------

  showall() {
    this.storeApi.GetProductStore().subscribe((it) => {
      this.dataStoreAll = it;
      console.log(this.dataStoreAll);
      for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
        this.datafilter[index] = this.dataStoreAll[index];
        this.filtertype[index] = this.datafilter[index];
        console.log(this.filtertype[index]);
        console.log(this.datafilter[index]);
      }
    });
  }
  onChange(data) {
    if (data == "ทั้งหมด") {
      this.showall();
      console.log(this.datas);
    }
    else {
      this.datafilter = this.filtertype.filter(it =>
        it.idProduct == data)
      console.log(this.datas);
    }
  }



}



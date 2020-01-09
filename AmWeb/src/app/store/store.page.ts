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
  dataSt: store;
  data;
  datas:product;
  datass:product[]=[];
  datasss:product[]=[];
  IdclearStore: any;
  getid: any;
  isShow: boolean = false;
  listdata: store[] = [];
  a;
  datafilter: store[] = [];
  total;
  sum;
  dataunit: string[] = [];;
  filter: store[] = [];
  public dataStoreAll: store;
  public arr: store[] = [];
  public datashow: store[] = [];
  constructor(public api:ProductService,public alertController: AlertController, public activate: ActivatedRoute, public storeApi: StoreService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
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

  }

  ionViewDidEnter() {
    this.get();
    this.get2();
  }


  public EditStore(id) {
    this.route.navigate(['/edit-store', { _id: id }]);
  }

  get() {
    this.storeApi.GetProductStore().subscribe((it) => {
      console.log(it);
      this.dataStoreAll = it;
      for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
        this.datafilter[index] = this.dataStoreAll[index];   
           this.total = this.datafilter[index].unitProduct;
         console.log(this.total);   
                   
      }         
      console.log(this.dataStore.value);
      
    });
  }

  get2(){
    this.api.GetProductAll().subscribe((it) => {
      console.log(it);
      this.datas = it;
      for (let index = 0; index < Object.keys(this.datas).length; index++) {
        this.datass[index] = this.datas[index];
        this.datasss = this.datass;        
        console.log(this.datasss[index]);
        console.log(this.datasss[index].total);
        
        
      }     
    });
  }

  public ClearStores(id) {

    console.log(this.IdclearStore);

    this.storeApi.GetProductStoreByid(id).subscribe(it => {
      console.log(it);
      this.dataSt = it
      console.log(this.dataSt);
      this.storeApi.ClearDataStore(id, this.dataSt).subscribe(it => {
        console.log(it);
      });
    });
  }
  setShow() {
    if (this.isShow == true) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }


  editlog() {

    this.dataSt = this.dataStore.value

    this.storeApi.EditDataStore(this.dataStoreAll.idProduct, this.dataSt).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/store']);
  }
  fil(){
    console.log(this.datafilter[1].unitProduct);
  }

 
}



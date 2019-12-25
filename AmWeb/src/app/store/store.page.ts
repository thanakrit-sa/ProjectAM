import { Component, OnInit } from '@angular/core';
import { StoreService } from "src/app/service/store.service";
import { store } from 'src/Models/stroe';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  dataStore: FormGroup;
  dataSt: store;
  data;
  IdclearStore: any;
  getid: any;
  isShow: boolean = false;
  listdata:store[] = [];
  public dataStoreAll: store;
  public datashow: store[] = [];
  constructor(public alertController: AlertController, public activate: ActivatedRoute, public storeApi: StoreService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
   
  }

  ngOnInit() {
    // this.get();

  }

  ionViewDidEnter() {
    this.get();
  }


  public EditStore(id) {
    this.route.navigate(['/edit-store', { _id: id }]);
  }

  get() {
    this.storeApi.GetProductStore().subscribe((it) => {
      console.log(it);
      this.dataStoreAll = it;
    //   this.datashow.push(it);
    //  for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
    //    this.listdata[index] = this.dataStoreAll[index];
       
    //  }
      // console.log(this.listdata);
      console.log(this.dataStoreAll);
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
      // this.get();
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
}


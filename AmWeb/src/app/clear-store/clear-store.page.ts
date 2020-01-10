import { Component, OnInit } from '@angular/core';
import { ClearService } from "src/app/service/clear.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from 'src/Models/product';


@Component({
  selector: 'app-clear-store',
  templateUrl: './clear-store.page.html',
  styleUrls: ['./clear-store.page.scss'],

})
export class ClearStorePage implements OnInit {

  public dataStoreAll: product;
  datafilter: product[] = [];
  filtertype: product[] = [];


  constructor(public productApi: ProductService, public route: Router, public clearApi: ClearService) { }

  ngOnInit() {
    this.showall()

  }

  ionViewDidEnter() {
    this.showall()
  }





  showall() {
    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
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

}

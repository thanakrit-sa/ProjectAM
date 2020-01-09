import { Component, OnInit } from '@angular/core';
import { ClearService } from "src/app/service/clear.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-clear-store',
  templateUrl: './clear-store.page.html',
  styleUrls: ['./clear-store.page.scss'],
})
export class ClearStorePage implements OnInit {

  public dataStoreAll:any;

  constructor(public productApi: ProductService,public route: Router,public clearApi:ClearService) { }

  ngOnInit() {
    this.showall()
   
  }

  ionViewDidEnter(){
    this.showall()
  }

  showall(){
    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataStoreAll = it;
      console.log(this.dataStoreAll);  
    });
  }
  public get(id) {
    this.route.navigate(['/edit-clear', { _id: id }]);
  }

}

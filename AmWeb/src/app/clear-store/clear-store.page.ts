import { Component, OnInit } from '@angular/core';
import { StoreService } from "src/app/service/store.service";

@Component({
  selector: 'app-clear-store',
  templateUrl: './clear-store.page.html',
  styleUrls: ['./clear-store.page.scss'],
})
export class ClearStorePage implements OnInit {

  public dataStoreAll:any;

  constructor(public storeApi:StoreService) { }

  ngOnInit() {
    this.storeApi.GetProductStore().subscribe((it) => {
      console.log(it);
      this.dataStoreAll = it;
      console.log(this.dataStoreAll);

   
    });
  }

}

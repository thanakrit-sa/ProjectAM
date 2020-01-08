import { Component, OnInit } from '@angular/core';
import { StoreService } from "src/app/service/store.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-clear-store',
  templateUrl: './clear-store.page.html',
  styleUrls: ['./clear-store.page.scss'],
})
export class ClearStorePage implements OnInit {

  public dataStoreAll:any;

  constructor(public route: Router,public storeApi:StoreService) { }

  ngOnInit() {
    this.showall()
   
  }

  ionViewDidEnter(){
    this.showall()
  }

  showall(){
    this.storeApi.GetProductStore().subscribe((it) => {
      console.log(it);
      this.dataStoreAll = it;
      console.log(this.dataStoreAll);  
    });
  }
  public get(id) {
    this.route.navigate(['/edit-clear', { _id: id }]);
  }

}

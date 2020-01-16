import { Component, OnInit } from '@angular/core';

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
  filterData:any[] =[]


  constructor(public productApi: ProductService, public route: Router){
  
  }
  isIndeterminate:boolean;
  masterCheck:boolean;
  checkBoxList:any;
ss:any =[]
  checkMaster() {
    setTimeout(()=>{
      this.datafilter.forEach(obj => {
        // console.log(obj);
        obj.statusCheck = this.masterCheck;

      });
    });
  }

  checkEvent() {
    const totalItems = this.datafilter.length;
    let checked = 0;
    this.datafilter.map(obj => {console.log(obj);
    
      {}
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
  }
  num:any[]=[]
 
  sss(){
  this.num = this.checkBoxList.forEach(it => {
      (it.checkBoxList) == true
      console.log(this.num);
  
    });
 

  }
  filter(){
    this.filterData = this.datafilter.filter(it => it.statusCheck == true)
    console.log(this.filterData);
    // console.log("a");
    
    
  }
  ////////////////////////////////////////////////////////////////*//////////////////////
  showall() {
    this.productApi.GetProductAll().subscribe((it) => {
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
  ngOnInit() {
    this.showall();
    console.log(this.datafilter);
    console.log(this.filterData);
    this.check= 0;
    

  }
  check= 0

  show(){
this.check = 1

  }
  return( ){  
    this.check =0
  }


  showinput(s){
    console.log(s)
    
  }
}

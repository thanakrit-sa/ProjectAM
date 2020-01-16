import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductService } from "src/app/service/product.service";
import { StoreService } from "src/app/service/store.service";
import { product } from 'src/Models/product';
import { month } from 'src/Models/month';

@Component({
  selector: 'app-dashbroad',
  templateUrl: './dashbroad.page.html',
  styleUrls: ['./dashbroad.page.scss'],
})
export class DashbroadPage implements OnInit {

  typeChart: any;
  dataChart: any;
  optionsChart: any;
  productAll: product;
  sumAmountProductInStore: number = 0;
  sumAmountProductSellInStore: number = 0;
  sumAmountProductTotalInStore: number = 0;
  sumSellPerProduct: number[] = [];
  sumSell: number = 0;
  sumCostPerProduct: number[] = [];
  sumCost: number = 0;
  sumTotal: number = 0;
  public chartLabel: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  public chartDataProductInStore: number[] = [];  
  public chartDataProductSellInStore: number[] = [];
  public chartDataProductTotalInStore: number[] = [];

  constructor(public productApi: ProductService, public storeApi: StoreService) { }

  ngOnInit() {
    this.openChart();    
    this.productGetAll();
    
  }




  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  productGetAll() {
    this.productApi.GetProductAll().subscribe(it => {
      // console.log(it);
      this.productAll = it;
      console.log(this.productAll);
      this.sumAmountProductInStore = 0;
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumAmountProductInStore = this.sumAmountProductInStore + parseInt(this.productAll[index].total);
        console.log(this.sumAmountProductInStore);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumAmountProductSellInStore = this.sumAmountProductSellInStore + parseInt(this.productAll[index].amountProduct);
        console.log(this.sumAmountProductSellInStore);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumAmountProductTotalInStore = this.sumAmountProductTotalInStore + parseInt(this.productAll[index].totalProduct);
        console.log(this.sumAmountProductTotalInStore);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumSellPerProduct[index] = parseInt(this.productAll[index].priceProduct) * parseInt(this.productAll[index].amountProduct);
        console.log(this.sumSellPerProduct);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumSell = this.sumSell + this.sumSellPerProduct[index];
        console.log(this.sumSell);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumCostPerProduct[index] = parseInt(this.productAll[index].costProduct) * parseInt(this.productAll[index].amountProduct);
        console.log(this.sumCostPerProduct);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumCost = this.sumCost + this.sumCostPerProduct[index];
        console.log(this.sumCost);
      }
      this.sumTotal = this.sumSell - this.sumCost;

      // -------------------- Chart --------------------

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.chartDataProductInStore[index] = this.productAll[index].total;        
      }
      console.log(this.chartDataProductInStore); 

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.chartDataProductSellInStore[index] = this.productAll[index].amountProduct;        
      }
      console.log(this.chartDataProductSellInStore);  

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.chartDataProductTotalInStore[index] = this.productAll[index].totalProduct;        
      }
      console.log(this.chartDataProductTotalInStore);  
    });
  }
    openChart() {
    var ctx = (<any>document.getElementById('mychart')).getContext('2d');
    var chart = new Chart(ctx, {

      type: 'line',
      data: {
        labels: this.chartLabel,
        datasets: [{
          data: this.chartDataProductInStore,
          label: "จำนวนสินค้านำเข้า",
          borderColor: "#212F3C",
          fill: false
        }, {
          data: this.chartDataProductSellInStore,
          label: "จำนวนสินค้าที่ขาย",
          borderColor: "#0E6655",
          fill: false
        }, {
          data: this.chartDataProductTotalInStore,
          label: "จำนวนสินค้าคงเหลือ",
          borderColor: "#900C3F",
          fill: false
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true

            }
          }]
        }
      }
    });

    var ctx = (<any>document.getElementById('mychart2')).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน'],
        datasets: [
          {
            label: "รายรับ",
            backgroundColor: "#1A5276",
            borderColor: "#1A5276",
            data: [10, 20, 30, 40, 50, 89, 120]
          },
          {
            label: "รายจ่าย",
            backgroundColor: "#5B2C6F ",
            borderColor: "#5B2C6F ",
            data: [9, 15, 24, 38, 30, 81, 96]
          },
          {
            label: "กำไรสุทธิ",
            backgroundColor: "#873600 ",
            borderColor: "#873600 ",
            data: [1, 5, 6, 2, 10, 8, 24]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  


}

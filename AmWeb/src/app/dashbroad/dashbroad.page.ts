import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductService } from "src/app/service/product.service";
import { StoreService } from "src/app/service/store.service";
import { product } from 'src/Models/product';
import { month } from 'src/Models/month';
import { UserService } from '../service/user.service';
import { MenuController } from '@ionic/angular';
import { OrderService } from '../service/order.service';
import { Order } from 'src/Models/order';
import { store } from 'src/Models/stroe';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-dashbroad',
  templateUrl: './dashbroad.page.html',
  styleUrls: ['./dashbroad.page.scss'],
})
export class DashbroadPage implements OnInit {
  netprofitinmonth: number = 0
  total2: number = 0
  total1: number = 0
  totalstock: number = 0
  totalbuyproduct: number = 0;
  expenditure: number = 0;
  filterrevenue: any[] = [];
  yearnow: any = "2020"
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  productAll: product;
  productlabel: product;
  sumAmountProductInStore: number = 0;
  sumAmountProductSellInStore: number = 0;
  sumAmountProductTotalInStore: number = 0;
  isShowCloseTab:boolean = true;
  isShowOpenTab:boolean = true;
  sumSellPerProduct: number[] = [];
  sumSell: number = 0;
  sumCostPerProduct: number[] = [];
  sumCost: number = 0;
  sumTotal: number = 0;
  datafilterrevenue: Order[] = []
  dataorderbydate: Order[] = []
  datastorebydate: store[] = []
  totalsellinmonth: number = 0;
  revenue: number = 0;
  public chartLabel: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public chartproductlabel: product[] = []
  year: any = null
  public chartrevenue: number[] = [];
  public chartDataProductInStore: number[] = [];
  public chartDataProductSellInStore: number[] = [];
  public chartDataProductTotalInStore: number[] = [];

  datenow: Date
  getDataAll: Order[] = [];
  showClose: boolean = false;
  constructor(public orderApi: OrderService, public productApi: ProductService, public storeApi: StoreService, public UserApi: UserService, private menu: MenuController) { }

  ngOnInit() {
    this.getyearnow();
    this.openChart();
    this.productGetAll();
    this.getnameproduct();
    this.getdataorderall()
    this.showrevennue();
    this.getalldatastore();
    this.showexpenditure();
    this.totalstockinmonth();
    this.netprofit();
  
  }
  ionViewWillEnter() {
    this.getyearnow();
    this.openChart();
    this.productGetAll();
    console.log(this.productApi.opentab);  
    this.menu.enable(true); 
    this.getnameproduct();
    this.getdataorderall()
    this.showrevennue();
    this.getalldatastore();
    this.totalstockinmonth();
    this.netprofit();

  }

  closeTab(){
    this.menu.enable(false);
    this.isShowOpenTab = false;
    this.isShowCloseTab = false;
  }
  openTab(){
    this.menu.enable(true);
    this.isShowOpenTab = true;
    this.isShowCloseTab = true;
  }

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }
  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }
  /////////////////////////////////////labelproductname////////////////////////////////////////////
  getnameproduct() {
    this.productApi.GetProductAll().subscribe(it => {
      this.productlabel = it
      for (let index = 0; index < Object.keys(this.productlabel).length; index++) {
        this.chartproductlabel[index] = this.productlabel[index].nameProduct
        console.log(this.chartproductlabel[index]);
      }
    })
  }

  ///////////////////////////////////////store////////////////////////////////////////////////////

  getalldatastore() {
    this.storeApi.GetProductStore().subscribe(it => {

      for (let index = 0; index < Object.keys(it).length; index++) {
        this.datastorebydate[index] = it[index]

      }

    })
    this.dataexpenditure()
  }




  //////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////order////////////////////////////////////////////////
  getdataorderall() {
    this.orderApi.GetListAllProduct().subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.dataorderbydate[index] = it[index]
      }
      console.log(this.dataorderbydate);
      this.datarevenue();
    })
  }
  onChangyear(data) {
    this.year = data
    this.yearnow = data
    console.log(this.year);
    console.log(this.yearnow);
   
  }

  onChange(data) {
    if (data == "ทั้งหมด") {
      this.datastorebydate = [];
      this.dataorderbydate = [];
      this.totalstock = 0
      this.orderApi.getorderallyear(this.year).subscribe(it => {
        for (let index = 0; index < Object.keys(it).length; index++) {
          this.dataorderbydate[index] = it[index]
        }
        this.datarevenue();
        this.totalstockinmonth()
        this.netprofit()

      })
      this.storeApi.getproductallyear(this.year).subscribe(it => {
        for (let index = 0; index < Object.keys(it).length; index++) {
          this.datastorebydate[index] = it[index]
        }
        this.dataexpenditure()
        this.totalstockinmonth()
        this.netprofit()
      })
    }

    else {
      this.datastorebydate = [];
      this.dataorderbydate = [];
      this.totalstock = 0
      this.orderApi.getorderlistbydateyear(this.year, data).subscribe(it => {
        for (let index = 0; index < Object.keys(it).length; index++) {
          this.dataorderbydate[index] = it[index]
        }
        console.log(this.dataorderbydate);
        this.datarevenue();
        this.totalstockinmonth()
        this.netprofit()

      })
      this.storeApi.getproductlistbydateyear(this.year, data).subscribe(it => {
        for (let index = 0; index < Object.keys(it).length; index++) {
          this.datastorebydate[index] = it[index]
        }
        this.dataexpenditure()
        this.totalstockinmonth()
        this.netprofit()
      })

    }


  }

  dataexpenditure() {
    this.expenditure = 0
    for (let index = 0; index < Object.keys(this.datastorebydate).length; index++) {
      this.expenditure = this.expenditure + parseInt(this.datastorebydate[index].costProduct)

    }
    this.totalbuyinmonth()
    // console.log("รายจ่าย = " + this.expenditure);
  }
  totalbuyinmonth() {
    this.total1 = 0
    this.totalbuyproduct = 0
    for (let index = 0; index < Object.keys(this.datastorebydate).length; index++) {
      this.totalbuyproduct = this.totalbuyproduct + parseInt(this.datastorebydate[index].totalProduct)
      this.total1 = this.totalbuyproduct
    }
    // console.log("นำเข้า = " + this.total1);
  }
  datarevenue() {
    this.revenue = 0;
    for (let index = 0; index < Object.keys(this.dataorderbydate).length; index++) {
      this.revenue = this.revenue + parseInt(this.dataorderbydate[index].priceOrder);
      console.log(this.dataorderbydate[index].priceOrder);
    }
    // console.log("รายรับ = "+this.revenue);
    this.selltotalinmonth();
  }
  selltotalinmonth() {
    this.total2 = 0
    this.totalsellinmonth = 0;
    for (let index = 0; index < Object.keys(this.dataorderbydate).length; index++) {
      this.totalsellinmonth = this.totalsellinmonth + parseInt(this.dataorderbydate[index].amountProduct)
      this.total2 = this.totalsellinmonth
    }
    // console.log("ขายออก = " + this.total2);

  }

  netprofit() {
    this.netprofitinmonth = this.revenue - this.expenditure
  }

  totalstockinmonth() {
    this.totalstock = 0
    this.totalstock = this.total1 - this.total2
    console.log(this.totalstock);
    console.log(this.total1);
    console.log(this.total2);


  }
  getyearnow() {
    this.datenow = new Date()
    this.yearnow = this.datenow.getFullYear().toString()
    console.log(this.yearnow);
  }

  check() {
    console.log(this.yearnow);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////variableexpenditure////////////////////////////////////////////////
  janexpenditure: store[] = []
  febexpenditure: store[] = []
  marexpenditure: store[] = []
  aprilexpenditure: store[] = []
  mayexpenditure: store[] = []
  juneexpenditure: store[] = []
  julyexpenditure: store[] = []
  augexpenditure: store[] = []
  septemberexpenditure: store[] = []
  octexpenditure: store[] = []
  novemberexpenditure: store[] = []
  decemberexpenditure: store[] = []
  expenditurejan = 0
  expenditurefeb = 0
  expendituremar = 0
  expenditureapril = 0
  expendituremay = 0
  expenditurejune = 0
  expenditurejuly = 0
  expenditureaug = 0
  expenditureseptember = 0
  expenditureoct = 0
  expenditurenovember = 0
  expendituredecember = 0
  ////////////////////////////////////////////showexpenditure///////////////////////////
  showexpenditure() {
    this.getproductjan();
    this.getproductfeb();
    this.getproductmar();
    this.getproductapril();
    this.getproductmay();
    this.getproductjune();
    this.getproductjuly();
    this.getproductaug();
    this.getproductseptember();
    this.getproductoct();
    this.getproductnovember();
    this.getproductdecember();
  }
  ///////////////////////////////////////////////expenditure/////////////////////////////////////////////
  getproductjan() {

    this.storeApi.getproductlistbydateyear(this.yearnow, "1").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.janexpenditure[index] = it[index]
      }
      console.log(this.janexpenditure);
      this.dataproductjan()
    })
  }
  dataproductjan() {
    this.expenditurejan = 0
    for (let index = 0; index < Object.keys(this.janexpenditure).length; index++) {
      this.expenditurejan = this.expenditurejan + parseInt(this.janexpenditure[index].costProduct);

    }
    console.log(this.expenditurejan);

  }
  getproductfeb() {

    this.storeApi.getproductlistbydateyear(this.yearnow, "2").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.febexpenditure[index] = it[index]
      }
      console.log(this.febexpenditure);
      this.dataproductfeb()
    })
  }
  dataproductfeb() {
    this.expenditurefeb = 0
    for (let index = 0; index < Object.keys(this.febexpenditure).length; index++) {
      this.expenditurefeb = this.expenditurefeb + parseInt(this.febexpenditure[index].costProduct);

    }
    console.log(this.febexpenditure);

  }
  getproductmar() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "3").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.marexpenditure[index] = it[index]
      }
      console.log(this.marexpenditure);
      this.dataproductmar()
    })
  }
  dataproductmar() {
    this.expendituremar = 0
    for (let index = 0; index < Object.keys(this.marexpenditure).length; index++) {
      this.expendituremar = this.expendituremar + parseInt(this.marexpenditure[index].costProduct);
    }
    console.log(this.expendituremar);

  }
  getproductapril() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "4").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.aprilexpenditure[index] = it[index]
      }
      console.log(this.aprilexpenditure);
      this.dataproductapril()
    })
  }
  dataproductapril() {
    this.expenditureapril = 0
    for (let index = 0; index < Object.keys(this.aprilexpenditure).length; index++) {
      this.expenditureapril = this.expenditureapril + parseInt(this.aprilexpenditure[index].costProduct);
    }
    console.log(this.expenditureapril);

  }
  getproductmay() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "5").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.mayexpenditure[index] = it[index]
      }
      console.log(this.mayexpenditure);
      this.dataproductmay()
    })
  }
  dataproductmay() {
    this.expendituremay = 0
    for (let index = 0; index < Object.keys(this.mayexpenditure).length; index++) {
      this.expendituremay = this.expendituremay + parseInt(this.mayexpenditure[index].costProduct);
    }
    console.log(this.expendituremay);

  }
  getproductjune() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "6").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.juneexpenditure[index] = it[index]
      }
      console.log(this.juneexpenditure);
      this.dataproductjune()
    })
  }
  dataproductjune() {
    this.expenditurejune = 0
    for (let index = 0; index < Object.keys(this.juneexpenditure).length; index++) {
      this.expenditurejune = this.expenditurejune + parseInt(this.juneexpenditure[index].costProduct);
    }
    console.log(this.expenditurejune);

  }
  getproductjuly() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "7").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.julyexpenditure[index] = it[index]
      }
      console.log(this.juneexpenditure);
      this.dataproductjuly()
    })
  }
  dataproductjuly() {
    this.expenditurejuly = 0
    for (let index = 0; index < Object.keys(this.julyexpenditure).length; index++) {
      this.expenditurejuly = this.expenditurejuly + parseInt(this.julyexpenditure[index].costProduct);
    }
    console.log(this.expenditurejuly);

  }
  getproductaug() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "8").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.augexpenditure[index] = it[index]
      }
      console.log(this.augexpenditure);
      this.dataproductaug()
    })
  }
  dataproductaug() {
    this.expenditureaug = 0
    for (let index = 0; index < Object.keys(this.augexpenditure).length; index++) {
      this.expenditureaug = this.expenditureaug + parseInt(this.augexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);
  }
  getproductseptember() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "9").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.septemberexpenditure[index] = it[index]
      }
      console.log(this.septemberexpenditure);
      this.dataproductseptember()
    })
  }
  dataproductseptember() {
    this.expenditureseptember = 0
    for (let index = 0; index < Object.keys(this.septemberexpenditure).length; index++) {
      this.expenditureseptember = this.expenditureseptember + parseInt(this.septemberexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);

  }
  getproductoct() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "10").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.octexpenditure[index] = it[index]
      }
      console.log(this.octexpenditure);
      this.dataproductoct()
    })
  }
  dataproductoct() {
    this.expenditureoct = 0
    for (let index = 0; index < Object.keys(this.octexpenditure).length; index++) {
      this.expenditureoct = this.expenditureoct + parseInt(this.octexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);

  }
  getproductnovember() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "11").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.novemberexpenditure[index] = it[index]
      }
      console.log(this.novemberexpenditure);
      this.dataproductnovember()
    })
  }
  dataproductnovember() {
    this.expenditurenovember = 0
    for (let index = 0; index < Object.keys(this.novemberexpenditure).length; index++) {
      this.expenditurenovember = this.expenditurenovember + parseInt(this.novemberexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);

  }
  getproductdecember() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "12").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.decemberexpenditure[index] = it[index]
      }
      console.log(this.decemberexpenditure);
      this.dataproductdecember()
    })
  }
  dataproductdecember() {
    this.expendituredecember = 0
    for (let index = 0; index < Object.keys(this.decemberexpenditure).length; index++) {
      this.expendituredecember = this.expendituredecember + parseInt(this.decemberexpenditure[index].costProduct);
    }
    console.log(this.expendituredecember);

  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////variablerevenue/////////////////////////////////////////

  janrevenue: Order[] = []
  febrevenue: Order[] = []
  marrevenue: Order[] = []
  aprilrevenue: Order[] = []
  mayrevenue: Order[] = []
  junerevenue: Order[] = []
  julyrevenue: Order[] = []
  augrevenue: Order[] = []
  septemberrevenue: Order[] = []
  octrevenue: Order[] = []
  novemberrevenue: Order[] = []
  decemberrevenue: Order[] = []
  revenuejan = 0
  revenuefeb = 0
  revenuemar = 0
  revenueapril = 0
  revenuemay = 0
  revenuejune = 0
  revenuejuly = 0
  revenueaug = 0
  revenueseptember = 0
  revenueoct = 0
  revenuenovember = 0
  revenuedecem = 0

  /////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////showrevennue///////////////////////////////////////
  showrevennue() {
    this.getOrderjan();
    this.getOrderfeb();
    this.getOrdermar();
    this.getOrderapril();
    this.getOrdermay();
    this.getOrderjune();
    this.getOrderjuly();
    this.getOrderaug();
    this.getOrderseptember();
    this.getOrderoct();
    this.getOrdernovember();
    this.getOrderdecem();
  }
  /////////////////////////////////////////monthrevenue////////////////////////////////////////////
  getOrderjan() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "1").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.janrevenue[index] = it[index]
      }
      console.log(this.janrevenue);
      this.datarevenueinmonth()
    })
  }
  datarevenueinmonth() {
    this.revenuejan = 0
    for (let index = 0; index < Object.keys(this.janrevenue).length; index++) {
      this.revenuejan = this.revenuejan + parseInt(this.janrevenue[index].priceOrder);
      console.log(this.janrevenue[index].priceOrder);
    }
    console.log(this.revenuejan);

  }
  getOrderfeb() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "2").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.febrevenue[index] = it[index]
      }
      console.log(this.febrevenue);
      this.datarevenueinfeb()
    })
  }
  datarevenueinfeb() {
    this.revenuefeb = 0
    for (let index = 0; index < Object.keys(this.febrevenue).length; index++) {
      this.revenuefeb = this.revenuefeb + parseInt(this.febrevenue[index].priceOrder);
      console.log(this.febrevenue[index].priceOrder);
    }
    console.log(this.revenuefeb);

  }
  getOrdermar() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "3").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.marrevenue[index] = it[index]
      }
      this.datarevenueinmar()
    })
  }
  datarevenueinmar() {
    this.revenuemar = 0
    for (let index = 0; index < Object.keys(this.marrevenue).length; index++) {
      this.revenuemar = this.revenuemar + parseInt(this.marrevenue[index].priceOrder);
      console.log(this.marrevenue[index].priceOrder);
    }
    console.log(this.revenuemar);

  }
  getOrderapril() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "4").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.aprilrevenue[index] = it[index]
      }
      this.datarevenueinapril()
    })
  }
  datarevenueinapril() {
    this.revenueapril = 0
    for (let index = 0; index < Object.keys(this.aprilrevenue).length; index++) {
      this.revenueapril = this.revenueapril + parseInt(this.aprilrevenue[index].priceOrder);
    }

  }
  getOrdermay() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "5").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.mayrevenue[index] = it[index]
      }
      this.datarevenueinmay()
      console.log(it);

    })
  }
  datarevenueinmay() {
    this.revenuemay = 0
    for (let index = 0; index < Object.keys(this.mayrevenue).length; index++) {
      this.revenuemay = this.revenuemay + parseInt(this.mayrevenue[index].priceOrder);
    }

  }
  getOrderjune() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "6").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.junerevenue[index] = it[index]
      }
      this.datarevenueinjune()
      console.log(it);

    })
  }
  datarevenueinjune() {
    this.revenuejune = 0
    for (let index = 0; index < Object.keys(this.junerevenue).length; index++) {
      this.revenuejune = this.revenuejune + parseInt(this.junerevenue[index].priceOrder);
    }

  }
  getOrderjuly() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "7").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.julyrevenue[index] = it[index]
      }
      this.datarevenueinjuly()
      console.log(it);

    })
  }
  datarevenueinjuly() {
    this.revenuejuly = 0
    for (let index = 0; index < Object.keys(this.julyrevenue).length; index++) {
      this.revenuejuly = this.revenuejuly + parseInt(this.julyrevenue[index].priceOrder);
    }

  }
  getOrderaug() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "8").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.augrevenue[index] = it[index]
      }
      this.datarevenueinaug()
      console.log(it);
    })
  }
  datarevenueinaug() {
    this.revenueaug = 0
    for (let index = 0; index < Object.keys(this.augrevenue).length; index++) {
      this.revenueaug = this.revenueaug + parseInt(this.augrevenue[index].priceOrder);
    }

  }
  getOrderseptember() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "9").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.septemberrevenue[index] = it[index]
      }
      this.datarevenueinseptemberrevenue()
      console.log(it);
    })
  }
  datarevenueinseptemberrevenue() {
    this.revenueseptember = 0
    for (let index = 0; index < Object.keys(this.septemberrevenue).length; index++) {
      this.revenueseptember = this.revenueseptember + parseInt(this.septemberrevenue[index].priceOrder);
    }

  }
  getOrderoct() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "10").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.octrevenue[index] = it[index]
      }
      this.datarevenueoct()
      console.log(it);
    })
  }
  datarevenueoct() {
    this.revenueoct = 0
    for (let index = 0; index < Object.keys(this.octrevenue).length; index++) {
      this.revenueoct = this.revenueoct + parseInt(this.octrevenue[index].priceOrder);
    }
  }
  getOrdernovember() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "11").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.novemberrevenue[index] = it[index]
      }
      this.datarevenuenovember()
      console.log(it);
    })
  }
  datarevenuenovember() {
    this.revenuenovember = 0
    for (let index = 0; index < Object.keys(this.novemberrevenue).length; index++) {
      this.revenuenovember = this.revenuenovember + parseInt(this.novemberrevenue[index].priceOrder);
    }

  }
  getOrderdecem() {
    this.orderApi.getorderlistbydateyear(this.yearnow, "12").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.decemberrevenue[index] = it[index]
      }
      this.datarevenuedecem()
      console.log(it);
    })
  }
  datarevenuedecem() {
    this.revenuedecem = 0
    for (let index = 0; index < Object.keys(this.decemberrevenue).length; index++) {
      this.revenuedecem = this.revenuedecem + parseInt(this.decemberrevenue[index].priceOrder);
    }

  }







  //////////////////////////////////////////////////////////////////////////////////////////

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
        this.productApi.chartDataProductInStore[index] = this.productAll[index].total;
      }
      console.log(this.productApi.chartDataProductInStore);

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.productApi.chartDataProductSellInStore[index] = this.productAll[index].amountProduct;
      }
      console.log(this.productApi.chartDataProductSellInStore);

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.productApi.chartDataProductTotalInStore[index] = this.productAll[index].totalProduct;
      }
      console.log(this.productApi.chartDataProductTotalInStore);


    });
  }
  openChart() {

    var ctx = (<any>document.getElementById('mychart')).getContext('2d');
    var chart = new Chart(ctx, {

      type: 'bar',
      data: {
        labels: this.chartproductlabel,
        datasets: [{
          data: this.productApi.chartDataProductInStore,
          label: "จำนวนสินค้านำเข้า",
          borderColor: "#212F3C",
          backgroundColor: "#212F3C",
          // fill: false
        }, {
          data: this.productApi.chartDataProductSellInStore,
          label: "จำนวนสินค้าที่ขาย",
          borderColor: "#0E6655",
          backgroundColor: "#0E6655",
          // fill: false
        }, {
          data: this.productApi.chartDataProductTotalInStore,
          label: "จำนวนสินค้าคงเหลือ",
          borderColor: "#900C3F",
          backgroundColor: "#900C3F",
          // fill: false
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
        labels: this.chartLabel,
        datasets: [
          {
            label: "รายรับ",
            backgroundColor: "#1A5276",
            borderColor: "#1A5276",
            data: [
              this.revenuejan,
              this.revenuefeb,
              this.revenuemar,
              this.revenueapril,
              this.revenuemay,
              this.revenuejune,
              this.revenuejuly,
              this.revenueaug,
              this.revenueseptember,
              this.revenueoct,
              this.revenuenovember,
              this.revenuedecem],
          },
          {
            label: "รายจ่าย",
            backgroundColor: "#5B2C6F ",
            borderColor: "#5B2C6F ",
            data: [
              this.expenditurejan,
              this.expenditurefeb,
              this.expendituremar,
              this.expenditureapril,
              this.expendituremay,
              this.expenditurejune,
              this.expenditurejuly,
              this.expenditureaug,
              this.expenditureseptember,
              this.expenditureoct,
              this.expenditurenovember,
              this.expendituredecember,]
          },
          {
            label: "กำไรสุทธิ",
            backgroundColor: "#873600 ",
            borderColor: "#873600 ",
            data: [
              this.revenuejan - this.expenditurejan,
              this.revenuefeb - this.expenditurefeb,
              this.revenuemar - this.expendituremar,
              this.revenueapril - this.expenditureapril,
              this.revenuemay - this.expendituremay,
              this.revenuejune - this.expenditurejune,
              this.revenuejuly - this.expenditurejuly,
              this.revenueaug - this.expenditureaug,
              this.revenueseptember - this.expenditureseptember,
              this.revenueoct - this.expenditureoct,
              this.revenuenovember - this.expenditurenovember,
              this.revenuedecem - this.expendituredecember,]
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

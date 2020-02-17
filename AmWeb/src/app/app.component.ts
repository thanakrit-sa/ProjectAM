import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from 'src/app/service/user.service';
import { MenuController } from '@ionic/angular';
import { ProductService } from "src/app/service/product.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {
  
  public appPages = [
    {
      title: 'แผงควบคุม',
      url: '/dashbroad',
      icon: 'pie'
    },
    {
      title: 'คลังสินค้า',
      url: '/store',
      icon: 'cube'
    },
    {
      title: 'สินค้า',
      url: '/product',
      icon: 'basket'
    },
    {
      title: 'สมาชิก',
      url: '/user',
      icon: 'contact'
    },
    {
      title: 'สต๊อกสินค้า',
      url: '/clear-store',
      icon: 'trash'
    },
    {
      title: 'รายการสั่งซื้อ',
      url: '/order-list',
      icon: 'list'
    },
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public userApi:UserService,
    private statusBar: StatusBar,
    private menu: MenuController,
    public api:ProductService
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 


}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from 'src/app/service/user.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {
  isShowMenu: boolean = true;
  public appPages = [
    {
      title: 'dashbroad',
      url: '/dashbroad',
      icon: 'pie'
    },
    {
      title: 'Store',
      url: '/store',
      icon: 'cube'
    },
    {
      title: 'Product',
      url: '/product',
      icon: 'basket'
    },
    {
      title: 'User',
      url: '/user',
      icon: 'contact'
    },
    {
      title: 'Clear',
      url: '/clear-store',
      icon: 'trash'
    },
    {
      title: 'Order',
      url: '/order-list',
      icon: 'list'
    },
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public userApi:UserService,
    private statusBar: StatusBar,
    private menu: MenuController
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openEnd() {    
      if (this.menu.enable(true)) {
        this.menu.enable(false);
      } else {
        this.menu.enable(true);
      }    
  }
}

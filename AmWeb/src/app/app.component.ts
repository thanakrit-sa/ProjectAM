import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
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
    private statusBar: StatusBar
  ) {
    console.log(this.userApi.statusUser);
    console.log(this.userApi.nameUser);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

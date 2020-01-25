import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { CallApiService } from './call-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'หน้าหลัก',
      url: '/list',
      icon: 'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    // {
    //   title: 'สั้งซื้อ',
    //   url: '/order',
    //   icon: 'list'
    // },
    {
      title: 'บัญชีผู้ใช้งาน',
      url: '/account-user',
      icon: 'person'
    },

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public route: Router,
    public callApi: CallApiService,
  ) {


    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.route.navigate(['/login']);
    this.callApi.nameUser = null
    this.callApi.name = null


  }
}

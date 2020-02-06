import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {HttpClientModule} from '@angular/common/http';
import {UserListPageComponent} from './pages/user-list-page/user-list-page.component';
import {NzLayoutModule, NzMessageModule} from 'ng-zorro-antd';
import {MenuProviderAdmin} from './menu-provider-admin';
import {MenuModule, MenuProvider} from '@commons';


@NgModule({
  declarations: [HomePageComponent, AdminPageComponent, UserListPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenuModule,
    HttpClientModule,
    NzLayoutModule,
    NzMessageModule,
  ],
  providers: [
    {provide: MenuProvider, useClass: MenuProviderAdmin}
  ]
})
export class AdminModule {
}

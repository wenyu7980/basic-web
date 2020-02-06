import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {MenuModule} from '../commons/menu/menu.module';
import {HttpClientModule} from '@angular/common/http';
import {UserListPageComponent} from './pages/user-list-page/user-list-page.component';
import {NzLayoutModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [HomePageComponent, AdminPageComponent, UserListPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenuModule,
    HttpClientModule,
    NzLayoutModule,
  ]
})
export class AdminModule {
}

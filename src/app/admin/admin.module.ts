import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {HttpClientModule} from '@angular/common/http';
import {UserTablePageComponent} from './pages/user-table-page/user-table-page.component';
import {NzLayoutModule, NzMessageModule, NzTableModule} from 'ng-zorro-antd';
import {MenuProviderAdmin} from './menu-provider-admin';
import {MenuModule, MenuProvider} from '@commons';
import {RoleTablePageComponent} from './pages/role-table-page/role-table-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    AdminPageComponent,
    UserTablePageComponent,
    RoleTablePageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenuModule,
    HttpClientModule,
    NzLayoutModule,
    NzMessageModule,
    NzTableModule,
  ],
  providers: [
    {provide: MenuProvider, useClass: MenuProviderAdmin}
  ]
})
export class AdminModule {
}

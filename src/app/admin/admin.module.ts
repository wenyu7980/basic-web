import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {HttpClientModule} from '@angular/common/http';
import {UserTablePageComponent} from './pages/user-table-page/user-table-page.component';
import {NzButtonModule, NzLayoutModule, NzMessageModule, NzTableModule} from 'ng-zorro-antd';
import {MenuOperatorProviderAdmin} from './menu-operator-provider-admin';
import {MenuOperatorModule, MenuOperatorProvider} from '@commons';
import {RoleTablePageComponent} from './pages/role-table-page/role-table-page.component';
import { RoleCreatePageComponent } from './pages/role-create-page/role-create-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    AdminPageComponent,
    UserTablePageComponent,
    RoleTablePageComponent,
    RoleCreatePageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenuOperatorModule,
    MenuOperatorModule,
    HttpClientModule,
    NzLayoutModule,
    NzMessageModule,
    NzTableModule,
    NzButtonModule,
  ],
  providers: [
    {provide: MenuOperatorProvider, useClass: MenuOperatorProviderAdmin}
  ]
})
export class AdminModule {
}

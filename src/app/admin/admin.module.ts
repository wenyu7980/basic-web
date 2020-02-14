import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {HttpClientModule} from '@angular/common/http';
import {UserTablePageComponent} from './pages/user-table-page/user-table-page.component';
import {
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzInputModule,
  NzLayoutModule,
  NzMessageModule,
  NzModalModule,
  NzTableModule,
  NzTabsModule,
  NzTreeModule
} from 'ng-zorro-antd';
import {MenuOperatorProviderAdmin} from './menu-operator-provider-admin';
import {RoleTablePageComponent} from './pages/role-table-page/role-table-page.component';
import {RoleSavePageComponent} from './pages/role-save-page/role-save-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MenuOperatorModule, MenuOperatorProvider, ValidatorErrorPipe} from '@commons';
import {UserDetailPageComponent} from './pages/user-detail-page/user-detail-page.component';
import {DepartmentTabComponent} from './tabs/department-tab/department-tab.component';
import { DepartmentDetailPageComponent } from './pages/department-detail-page/department-detail-page.component';
import { DepartmentTablePageComponent } from './pages/department-table-page/department-table-page.component';
import { RoleDetailPageComponent } from './pages/role-detail-page/role-detail-page.component';


@NgModule({
  declarations: [
    ValidatorErrorPipe,
    HomePageComponent,
    AdminPageComponent,
    UserTablePageComponent,
    RoleTablePageComponent,
    RoleSavePageComponent,
    UserDetailPageComponent,
    DepartmentTabComponent,
    DepartmentDetailPageComponent,
    DepartmentTablePageComponent,
    RoleDetailPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MenuOperatorModule,
    HttpClientModule,
    NzLayoutModule,
    NzMessageModule,
    NzTableModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTreeModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzTabsModule,
  ],
  providers: [
    {provide: MenuOperatorProvider, useClass: MenuOperatorProviderAdmin}
  ]
})
export class AdminModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {HttpClientModule} from '@angular/common/http';
import {UserTablePageComponent} from './pages/user-table-page/user-table-page.component';
import {MenuOperatorProviderAdmin} from './menu-operator-provider-admin';
import {RoleTablePageComponent} from './pages/role-table-page/role-table-page.component';
import {RoleSavePageComponent} from './pages/role-save-page/role-save-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MenuOperatorModule, MenuOperatorProvider, ValidatorErrorPipe} from '@commons';
import {UserDetailPageComponent} from './pages/user-detail-page/user-detail-page.component';
import {DepartmentTabComponent} from './tabs/department-tab/department-tab.component';
import {DepartmentDetailPageComponent} from './pages/department-detail-page/department-detail-page.component';
import {DepartmentTablePageComponent} from './pages/department-table-page/department-table-page.component';
import {RoleDetailPageComponent} from './pages/role-detail-page/role-detail-page.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzTreeModule} from 'ng-zorro-antd/tree';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTabsModule} from 'ng-zorro-antd/tabs';


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
    {
      provide: MenuOperatorProvider,
      useClass: MenuOperatorProviderAdmin,
    }
  ]
})
export class AdminModule {
}

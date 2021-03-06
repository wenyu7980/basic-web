import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {UserTablePageComponent} from './pages/user-table-page/user-table-page.component';
import {MenuGuardAdmin} from './menu-guard-admin';
import {RoleTablePageComponent} from './pages/role-table-page/role-table-page.component';
import {RoleSavePageComponent} from './pages/role-save-page/role-save-page.component';
import {UserDetailPageComponent} from './pages/user-detail-page/user-detail-page.component';
import {DepartmentDetailPageComponent} from './pages/department-detail-page/department-detail-page.component';
import {DepartmentTablePageComponent} from './pages/department-table-page/department-table-page.component';
import {RoleDetailPageComponent} from './pages/role-detail-page/role-detail-page.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivateChild: [MenuGuardAdmin],
    children: [
      {
        path: 'home',
        component: HomePageComponent
      }, {
        path: 'users',
        component: UserTablePageComponent,
        data: {code: 'userTablePage'}
      }, {
        path: 'users/:id',
        component: UserDetailPageComponent,
        data: {code: 'userDetailPage'}
      }, {
        path: 'departments',
        component: DepartmentTablePageComponent,
        data: {code: 'departmentTablePage'}
      }, {
        path: 'departments/:id',
        component: DepartmentDetailPageComponent,
        data: {code: 'departmentDetailPage'}
      }, {
        path: 'roles',
        component: RoleTablePageComponent,
        data: {code: 'roleTablePage'}
      }, {
        path: 'roles/save',
        component: RoleSavePageComponent,
        data: {code: 'roleAddPage'}
      }, {
        path: 'roles/:id',
        component: RoleDetailPageComponent,
        data: {code: 'roleDetailPage'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

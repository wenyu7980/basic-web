import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {UserTablePageComponent} from './pages/user-table-page/user-table-page.component';
import {MenuGuardAdmin} from './menu-guard-admin';
import {RoleTablePageComponent} from './pages/role-table-page/role-table-page.component';
import {RoleCreatePageComponent} from './pages/role-create-page/role-create-page.component';


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
        data: {code: 'users'}
      }, {
        path: 'roles',
        component: RoleTablePageComponent,
        data: {code: 'roles'}
      }, {
        path: 'roles/create',
        component: RoleCreatePageComponent,
        data: {code: 'roleCreate'}
      }, {
        path: '**',
        redirectTo: 'home'
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

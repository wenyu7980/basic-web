import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {UserTablePageComponent} from './pages/user-table-page/user-table-page.component';
import {MenuGuardAdmin} from './menu-guard-admin';
import {RoleTablePageComponent} from './pages/role-table-page/role-table-page.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivateChild: [MenuGuardAdmin],
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'users',
        component: UserTablePageComponent
      },
      {
        path: 'roles',
        component: RoleTablePageComponent
      },
      {
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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {UserListPageComponent} from './pages/user-list-page/user-list-page.component';
import {MenuGuardAdmin} from './menu-guard-admin';


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
        component: UserListPageComponent
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

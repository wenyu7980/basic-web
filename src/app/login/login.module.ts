import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {NzButtonModule, NzFormModule, NzInputModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ]
})
export class LoginModule {
}

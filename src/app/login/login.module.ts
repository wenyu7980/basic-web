import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginRoutingModule} from './login-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzMessageModule} from 'ng-zorro-antd/message';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
  ]
})
export class LoginModule {
}

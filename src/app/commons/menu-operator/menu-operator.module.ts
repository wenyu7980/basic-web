import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzIconModule, NzMenuModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './menu.component';
import {OperatorDirective} from './operator.directive';


@NgModule({
  declarations: [
    MenuComponent,
    OperatorDirective,
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
  ],
  exports: [
    MenuComponent,
    OperatorDirective,
  ]
})
export class MenuOperatorModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './menu.component';
import {OperatorDirective} from './operator.directive';
import {NzMenuModule} from 'ng-zorro-antd/menu';


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

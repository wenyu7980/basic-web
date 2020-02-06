import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzIconModule, NzMenuModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
  ],
  exports: [MenuComponent]
})
export class MenuModule {
}

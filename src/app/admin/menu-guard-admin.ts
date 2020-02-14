import {Injectable} from '@angular/core';
import {MenuRouteGuard} from '@commons';
import {MenuOperatorProviderAdmin} from './menu-operator-provider-admin';
import {NzMessageService} from 'ng-zorro-antd';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MenuGuardAdmin extends MenuRouteGuard {

  constructor(private provider: MenuOperatorProviderAdmin,
              private messageService: NzMessageService,
              private location: Location) {
    super(provider);
  }

  protected failBack() {
    this.messageService.error('访问页面的权限不足，请联系管理员');
    this.location.back();
  }
}

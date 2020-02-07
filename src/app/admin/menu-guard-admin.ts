import {Injectable} from '@angular/core';
import {MenuRouteGuard} from '@commons';
import {MenuOperatorProviderAdmin} from './menu-operator-provider-admin';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root',
})
export class MenuGuardAdmin extends MenuRouteGuard {

  constructor(private provider: MenuOperatorProviderAdmin,
              private messageServie: NzMessageService) {
    super(provider);
  }

  protected failBack() {
    this.messageServie.error('访问页面的权限不足，请联系管理员');
  }
}

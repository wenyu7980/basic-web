import {Injectable} from '@angular/core';
import {MenuRouteGuard} from '../commons/menu/menu-route-guard';
import {MenuProviderAdmin} from './menu-provider-admin';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root',
})
export class MenuGuardAdmin extends MenuRouteGuard {

  constructor(private provider: MenuProviderAdmin,
              private messageServie: NzMessageService) {
    super(provider);
  }

  protected failBack() {
    this.messageServie.error('访问页面的权限不足，请联系管理员');
  }
}

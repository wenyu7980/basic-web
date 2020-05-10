import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {LoginResultCache, MenuOperatorItem, MenuOperatorProvider, OperatorItem} from '@commons';
import {Injectable} from '@angular/core';
import {LoginResult, RoleMenuOperator} from '@rest-models';
import {Router} from '@angular/router';
import {RoleMenuOperatorCache} from '../commons/cache/role-menu-operator-cache';

@Injectable({
  providedIn: 'root'
})
export class MenuOperatorProviderAdmin extends MenuOperatorProvider {


  constructor(
    private httpClient: HttpClient,
    private menuOperatorCache: RoleMenuOperatorCache,
    private loginResultCache: LoginResultCache,
    private router: Router,
  ) {
    super();
  }

  protected getMenus(): Observable<MenuOperatorItem[]> {
    return this.httpClient.get<MenuOperatorItem[]>('/assets/admin-menu.json');
  }

  protected getOperators(): Observable<OperatorItem[]> {
    return this.httpClient.get<OperatorItem[]>('/assets/admin-operator.json');
  }

  confirmMenu(code: string): boolean {
    const result = this.getLoginResult();
    return result.system || this.getRoleMenuOperator().menus.includes(code);
  }

  confirmOperator(code: string): boolean {
    const result = this.getLoginResult();
    return result.system || this.getRoleMenuOperator().operators.includes(code);
  }

  private getRoleMenuOperator(): RoleMenuOperator {
    if (!this.menuOperatorCache.getValue()) {
      this.router.navigate(['/login']);
    }
    return this.menuOperatorCache.getValue();
  }

  private getLoginResult(): LoginResult {
    if (!this.loginResultCache.getValue()) {
      this.router.navigate(['/login']);
    }
    return this.loginResultCache.getValue();
  }
}

import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {LoginResultCache, MenuOperatorItem, MenuOperatorProvider, OperatorItem} from '@commons';
import {Injectable} from '@angular/core';
import {LoginResult} from '@rest-models';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuOperatorProviderAdmin extends MenuOperatorProvider {


  constructor(
    private httpClient: HttpClient,
    private resultCache: LoginResultCache,
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
    return result.system || result.menus.includes(code);
  }

  confirmOperator(code: string): boolean {
    const result = this.getLoginResult();
    return result.system || result.operators.includes(code);
  }

  private getLoginResult(): LoginResult {
    if (!this.resultCache.getValue()) {
      this.router.navigate(['/login']);
    }
    return this.resultCache.getValue();
  }
}

import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {MenuItem, MenuOperatorProvider, OperatorItem} from '@commons';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuOperatorProviderAdmin extends MenuOperatorProvider {


  constructor(private httpClient: HttpClient) {
    super();
  }

  protected getMenus(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>('/assets/admin-menu.json');
  }

  protected getOperators(): Observable<OperatorItem[]> {
    return this.httpClient.get<OperatorItem[]>('/assets/admin-operator.json');
  }

  protected confirmMenu(code: string): boolean {
    return ['users', 'roles', 'roleCreate'].includes(code);
  }

  protected confirmOperator(code: string): boolean {
    return ['userAdd'].includes(code);
  }
}

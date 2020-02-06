import {Observable, of} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MenuItem, MenuProvider} from '@commons';

@Injectable({
  providedIn: 'root',
})
export class MenuProviderAdmin extends MenuProvider {

  constructor(private httpClient: HttpClient) {
    super();
  }

  protected getMenus(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>('/assets/admin-menu.json');
  }

  protected getMenuCodes(): Observable<string[]> {
    return of(['users', 'roles']);
  }

  get(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>('/assets/admin-menu.json');
  }
}

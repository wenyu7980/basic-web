import {MenuProvider} from '../commons/menu/menu-provider';
import {Observable, of} from 'rxjs';
import {MenuItem} from '../commons/menu/menu-item';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

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
    return of(['users']);
  }

  get(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>('/assets/admin-menu.json');
  }
}

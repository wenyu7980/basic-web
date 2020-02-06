import {Component} from '@angular/core';
import {TableData, TablePage, TableQueryParam} from '@commons';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-table-page.component.html',
  styleUrls: ['./user-table-page.component.less']
})
export class UserTablePageComponent extends TablePage<UserItem> {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient
  ) {
    super(router, activatedRoute);
  }

  protected setParam(param: TableQueryParam): boolean {
    return true;
  }

  protected getParam(): TableQueryParam {
    return {};
  }

  protected getData(param: TableQueryParam):
    Observable<TableData<UserItem> | HttpErrorResponse> {
    return of({total: 100, data: [{username: `username,index:${param.index},size:${param.size}`}]});
  }

  protected errorHandler(error: HttpErrorResponse) {
    console.log(error);
  }

}

interface UserItem {
  /** 用户名 */
  username: string;
}

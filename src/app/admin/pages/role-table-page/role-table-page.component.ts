import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableData, TableQueryParam, TableTemplate} from '@commons';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-role-table-page',
  templateUrl: './role-table-page.component.html',
  styleUrls: ['./role-table-page.component.less']
})
export class RoleTablePageComponent extends TableTemplate<RoleItem, TableQueryParam> implements OnInit {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  protected errorHandler(error: HttpErrorResponse) {
  }

  protected getData(param: TableQueryParam): Observable<TableData<RoleItem>> {
    return of<TableData<RoleItem>>({
      total: 30,
      data: [{id: '12', name: '123'}]
    });
  }

  protected getParam(): TableQueryParam {
    return {};
  }

  protected setParam(param: TableQueryParam): boolean {
    return false;
  }


  ngOnInit() {
    super.ngOnInit();
  }

  /**
   * 创建角色
   */
  roleCreate() {
    this.router.navigate(['/admin/roles/create']);
  }
}

interface RoleItem {
  id: string;
  name: string;
}

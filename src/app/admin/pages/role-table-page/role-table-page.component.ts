import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuOperators, TableData, TableQueryParam, TableTemplate} from '@commons';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoleListDetail} from '@rest-models';
import {RoleService} from '../../../rest/services/role.service';
import {map} from 'rxjs/operators';
import {ErrorHandlerService} from '@rest';

@MenuOperators([
  {code: 'roleDelete', show: (data: RoleListDetail) => !data.deletedFlag}
])
@Component({
  selector: 'app-role-table-page',
  templateUrl: './role-table-page.component.html',
  styleUrls: ['./role-table-page.component.less']
})
export class RoleTablePageComponent extends TableTemplate<RoleListDetail, TableQueryParam> implements OnInit {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private roleService: RoleService,
              private errorHandlerService: ErrorHandlerService
  ) {
    super(router, activatedRoute);
  }

  protected errorHandler(error: HttpErrorResponse) {
    this.errorHandlerService.handler(error);
  }

  protected getData(param: TableQueryParam): Observable<TableData<RoleListDetail>> {
    return this.roleService.getRoles({
      ...param,
      detail: true,
      index: param.index - 1
    }).pipe(map(body => {
      return {total: body.count, data: body.data};
    }));
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

  deleteRole(id: string) {
    this.roleService.removeRole(id).subscribe(() => this.refresh());
  }


}

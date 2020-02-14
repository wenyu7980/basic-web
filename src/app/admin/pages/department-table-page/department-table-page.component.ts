import {Component, OnInit} from '@angular/core';
import {MenuOperators, TableData, TableQueryParam, TableTemplate} from '@commons';
import {DepartmentListDetail} from '@rest-models';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentService, ErrorHandlerService} from '@rest';
import {map} from 'rxjs/operators';

@MenuOperators([
  {
    code: 'departmentAdd',
    show: () => true
  }
])
@Component({
  selector: 'app-department-table-page',
  templateUrl: './department-table-page.component.html',
  styleUrls: ['./department-table-page.component.less']
})
export class DepartmentTablePageComponent extends TableTemplate<DepartmentListDetail, TableQueryParam> implements OnInit {


  constructor(
    route: Router,
    activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private errorHandlerService: ErrorHandlerService) {
    super(route, activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected errorHandler(err: HttpErrorResponse) {
    this.errorHandlerService.handler(err);
  }

  protected getData(param: TableQueryParam):
    Observable<TableData<DepartmentListDetail>> {
    return this.departmentService.getDepartments({
      ...param,
      index: param.index - 1,
      size: param.size,
      detail: true
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
}

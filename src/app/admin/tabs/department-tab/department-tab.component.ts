import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableData, TabTableQueryParam, TabTableTemplate} from '@commons';
import {DepartmentListDetail, DepartmentSimple} from '@rest-models';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DepartmentService, ErrorHandlerService} from '@rest';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-department-tab',
  templateUrl: './department-tab.component.html',
  styleUrls: ['./department-tab.component.less']
})
export class DepartmentTabComponent
  extends TabTableTemplate<DepartmentListDetail, DepartmentQueryParam> implements OnInit {

  @Input()
  userId: string;
  @Input()
  adminId: string;
  @Input()
  companyId: string;
  @Input()
  parentId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private errHandler: ErrorHandlerService) {
    super(router, activatedRoute, 10);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getParam(): DepartmentQueryParam {
    return {
      tab: this.tab,
      userId: this.userId,
      adminId: this.adminId,
      companyId: this.companyId,
      parentId: this.parentId,
    };
  }

  protected setParam(param: DepartmentQueryParam): boolean {
    return param.tab !== this.tab
      || param.userId !== this.userId
      || param.adminId !== this.adminId
      || param.companyId !== this.companyId
      || param.parentId !== this.parentId;
  }

  protected getData(param: DepartmentQueryParam): Observable<TableData<DepartmentSimple>> {
    return this.departmentService
      .getDepartments({...param, index: param.index - 1, detail: true})
      .pipe(map((body) => {
        return {
          total: body.count,
          data: body.data
        };
      }));
  }

  protected errorHandler(err: HttpErrorResponse) {
    this.errHandler.handler(err);
  }

}

interface DepartmentQueryParam extends TabTableQueryParam {
  userId: string;
  adminId: string;
  companyId: string;
  parentId: string;
}

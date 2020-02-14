import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableData, TabTableQueryParam, TabTableTemplate} from '@commons';
import {DepartmentSimple} from '@rest-models';
import {Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-department-tab',
  templateUrl: './user-department-tab.component.html',
  styleUrls: ['./user-department-tab.component.less']
})
export class UserDepartmentTabComponent
  extends TabTableTemplate<DepartmentSimple, DepartmentQueryParam> implements OnInit {

  @Input()
  userId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    super(router, activatedRoute, 10);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getParam(): DepartmentQueryParam {
    return {
      tab: this.tab,
      userId: this.userId
    };
  }

  protected setParam(param: DepartmentQueryParam): boolean {
    return param.tab !== this.tab || param.userId !== this.userId;
  }

  protected getData(param: DepartmentQueryParam): Observable<HttpErrorResponse | TableData<DepartmentSimple>> {
    return of({total: 10, data: []});
  }

  protected errorHandler(err: HttpErrorResponse) {
  }

}

interface DepartmentQueryParam extends TabTableQueryParam {
  userId: string;
}

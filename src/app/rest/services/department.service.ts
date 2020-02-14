import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DepartmentDetail, DepartmentListDetail, PageBody} from '@rest-models';
import {HttpClient} from '@angular/common/http';
import {ParamConvert} from './param-convert';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * 部门查询
   * @param param 参数
   */
  getDepartments(param: {
    detail: boolean,
    size?: number,
    index?: number,
    adminId?: string,
    userId?: string,
  }): Observable<PageBody<DepartmentListDetail>> {
    return this.httpClient.get(`/departments`, {
      params: ParamConvert.convert(param)
    });
  }

  getDeparment(id: string, detailFlag: boolean): Observable<DepartmentDetail> {
    return this.httpClient.get(`/departments/${id}`,
      {params: ParamConvert.convert({detail: detailFlag})});
  }

}

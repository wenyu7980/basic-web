import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DepartmentListDetail, PageBody} from '@rest-models';
import {HttpClient} from '@angular/common/http';
import {ParamConvert} from './param-convert';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {
  }

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
}

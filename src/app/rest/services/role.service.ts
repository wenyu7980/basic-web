import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageBody, Role, RoleAdd, RoleDetail, RoleListDetail} from '@rest-models';
import {ParamConvert} from './param-convert';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private client: HttpClient) {
  }

  /**
   * 创建角色
   * @param role 角色
   */
  addRole(role: RoleAdd): Observable<Role> {
    return this.client.post('/roles', role);
  }

  /**
   * 修改角色
   * @param id 角色id
   * @param role 角色
   */
  modifyRole(id: string, role: RoleAdd): Observable<Role> {
    return this.client.put(`/roles/${id}`, role);
  }

  /**
   * 查询角色
   * @param param 参数
   */
  getRoles(param: {
    detail: boolean,
    size?: number,
    index?: number
  }): Observable<PageBody<RoleListDetail>> {
    return this.client.get(`/roles`, {
      params: ParamConvert.convert(param)
    });
  }

  removeRole(id: string): Observable<void> {
    return this.client.delete<void>(`/roles/${id}`);
  }

  getRole(id: string, detailFlag: boolean): Observable<RoleDetail> {
    return this.client.get(`/roles/${id}`,
      {params: ParamConvert.convert({detail: detailFlag})});
  }
}

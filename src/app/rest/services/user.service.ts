import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageBody, User, UserAdd, UserDetail, UserListDetail} from '@rest-models';
import {ParamConvert} from './param-convert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * 查询用户
   * @param id 用户id
   * @param detailFlag 详情
   */
  getUser(id: string, detailFlag: boolean = false): Observable<UserDetail> {
    return this.httpClient
      .get(`/users/${id}`,
        {params: ParamConvert.convert({detail: detailFlag})});
  }

  getUsers(param: {
    detail: boolean,
    size?: number,
    index?: number
  }): Observable<PageBody<UserListDetail>> {
    return this.httpClient.get('/users',
      {params: ParamConvert.convert(param)});
  }

  addUser(user: UserAdd): Observable<User> {
    return this.httpClient.post('/users', user);
  }

  /**
   * 删除用户
   * @param id 用户id
   */
  removeUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/users/${id}`);
  }
}

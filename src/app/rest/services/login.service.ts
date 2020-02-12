import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login, LoginResult} from '@rest-models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 登录
   * @param login 登录数据
   */
  login(login: Login): Observable<LoginResult | HttpErrorResponse> {
    return this.httpClient.post<LoginResult | HttpErrorResponse>('/login', login);
  }
}

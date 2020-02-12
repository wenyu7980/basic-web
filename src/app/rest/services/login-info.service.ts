import {Injectable} from '@angular/core';
import {LoginResult} from '@rest-models';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {
  private result: LoginResult;

  constructor() {
  }

  setResult(result: LoginResult) {
    this.result = result;
  }
}

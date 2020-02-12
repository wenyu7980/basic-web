import {Injectable} from '@angular/core';
import {LoginResult} from '@rest-models';
import {AbstractCache} from './abstract-cache';

@Injectable({
  providedIn: 'root'
})
export class LoginResultCache extends AbstractCache<LoginResult> {
  constructor() {
    super('login-result');
  }
}

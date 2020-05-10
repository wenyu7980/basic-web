import {AbstractCache} from './abstract-cache';
import {RoleMenuOperator} from '@rest-models';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleMenuOperatorCache extends AbstractCache<RoleMenuOperator> {
  constructor() {
    super('role-menu-operator');
  }
}

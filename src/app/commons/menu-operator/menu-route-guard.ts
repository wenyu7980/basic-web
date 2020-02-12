import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuOperatorProvider} from './menu-operator-provider';

export abstract class MenuRouteGuard implements CanActivateChild {
  protected constructor(private menuProvider: MenuOperatorProvider) {
  }

  /**
   * 失败回调
   */
  protected abstract failBack();

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.menuProvider.confirmMenu(childRoute.data.code);
  }
}

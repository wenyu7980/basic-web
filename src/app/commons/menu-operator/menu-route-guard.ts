import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuOperatorProvider} from './menu-operator-provider';
import {map} from 'rxjs/operators';

export abstract class MenuRouteGuard implements CanActivateChild {
  constructor(private menuProvider: MenuOperatorProvider) {
  }

  /**
   * 失败回调
   */
  protected abstract failBack();

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.menuProvider.getRouteCodes().pipe(
      map(urls => {
        if (!childRoute.data.code) {
          return true;
        }
        if (urls.has(childRoute.data.code)) {
          return true;
        }
        this.failBack();
        return false;
      })
    );
  }
}

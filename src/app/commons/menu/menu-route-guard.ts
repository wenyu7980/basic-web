import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MenuProvider} from './menu-provider';
import {map, tap} from 'rxjs/operators';

export abstract class MenuRouteGuard implements CanActivateChild {
  urls: string[];

  constructor(private menuProvider: MenuProvider) {
  }

  /**
   * 失败回调
   */
  protected abstract failBack();

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.urls) {
      return this.menuProvider.getMenuUrls().pipe(
        tap(urls => this.urls = urls),
        map(urls => {
          for (const url of urls) {
            if (state.url.includes(url)) {
              return true;
            }
          }
          this.failBack();
          return false;
        })
      );
    }
    for (const url of this.urls) {
      if (state.url.includes(url)) {
        return true;
      }
    }
    this.failBack();
    return false;
  }
}

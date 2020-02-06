import {MenuItem} from './menu-item';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

/**
 * 菜单提供器
 */
export abstract class MenuProvider {
  protected abstract getMenus(): Observable<MenuItem[]>;

  protected abstract getMenuCodes(): Observable<string[]>;

  getMenuUrls(): Observable<string[]> {
    return this.getMenuItems().pipe(
      map(menus => this.getUrls(menus))
    );
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.getMenuCodes().pipe(
      switchMap((codes: string[]) =>
        this.getMenus().pipe(
          map(menus => this.filterMenu(menus, codes))
        ))
    );
  }

  private filterMenu(menus: MenuItem[], codes: string[]): MenuItem[] {
    if (!menus) {
      return [];
    }
    const rets: MenuItem[] = [];
    for (const menu of menus) {
      if (menu.publicFlag) {
        rets.push(menu);
        continue;
      }
      const child = this.filterMenu(menu.children, codes);
      if (child.length > 0) {
        rets.push({...menu, children: child});
      } else if (menu.code && codes.indexOf(menu.code) >= 0) {
        rets.push({...menu, children: null});
      }
    }
    return rets;
  }

  private getUrls(menus: MenuItem[]): string[] {
    if (!menus) {
      return [];
    }
    const urls: string[] = [];
    for (const menu of menus) {
      if (menu.path) {
        urls.push(menu.path);
      }
      urls.push(...this.getUrls(menu.children));
    }
    return urls;
  }
}

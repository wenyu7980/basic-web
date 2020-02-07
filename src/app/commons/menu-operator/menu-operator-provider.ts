import {MenuItem} from './menu-item';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {OperatorItem} from '@commons';

/**
 * 菜单提供器
 */
export abstract class MenuOperatorProvider {
  /** 可访问路由code */
  private urls: Set<string>;
  /** 可访问菜单 */
  private menus: MenuItem[];
  /** 可操作code */
  private operators: Set<string>;

  /**
   * 获取菜单
   */
  protected abstract getMenus(): Observable<MenuItem[]>;


  /**
   * 所有操作
   */
  protected abstract getOperators(): Observable<OperatorItem[]>;

  /**
   * 获取用户可访问的菜单code
   */
  protected abstract getUserMenuCodes(): Observable<string[]>;

  /**
   * 获取用户可操作的操作code
   */
  protected abstract getUserOperatorCodes(): Observable<string[]>;

  /**
   * 路由code
   */
  getRouteCodes(): Observable<Set<string>> {
    if (this.urls) {
      return of(this.urls);
    }
    return this.getUserMenuCodes().pipe(
      map(codes => new Set<string>(codes)),
      tap(urls => this.urls = urls)
    );
  }

  /**
   * 可访问菜单
   */
  getMenuItems(): Observable<MenuItem[]> {
    if (this.menus) {
      return of(this.menus);
    }
    return this.getUserMenuCodes().pipe(
      map(codes => new Set<string>(codes)),
      tap(codes => this.urls = codes),
      switchMap((codes: Set<string>) =>
        this.getMenus().pipe(
          map(menus => this.filterMenu(menus, codes))
        )),
      tap(menus => this.menus = menus)
    );
  }

  /**
   * 用户可用操作
   */
  getOperatorCodes(): Observable<Set<string>> {
    if (this.operators) {
      return of(this.operators);
    }
    return this.getUserOperatorCodes().pipe(
      map(codes => new Set<string>(codes)),
      tap(codes => this.operators = codes)
    );
  }

  /**
   * 可访问菜单
   * @param menus 菜单
   * @param codes 可访问菜单code
   */
  private filterMenu(menus: MenuItem[], codes: Set<string>): MenuItem[] {
    if (!menus) {
      return [];
    }
    const rets: MenuItem[] = [];
    for (const menu of menus) {
      if (!menu.children || menu.children.length === 0) {
        // 叶子节点
        if (!menu.configurable) {
          rets.push({...menu, children: null});
        } else if (codes.has(menu.code) && !menu.disabled) {
          rets.push({...menu, children: null});
        }
        continue;
      }
      // 非叶子节点
      const child = this.filterMenu(menu.children, codes);
      if (child.length > 0) {
        rets.push({...menu, children: child});
      }
    }
    return rets;
  }

  /**
   * 可访问的菜单路由
   * @param menus 可访问的菜单
   */
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

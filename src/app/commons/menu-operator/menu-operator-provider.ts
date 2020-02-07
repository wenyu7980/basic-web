import {MenuItem} from './menu-item';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {OperatorItem} from '@commons';

/**
 * 菜单提供器
 */
export abstract class MenuOperatorProvider {
  /** 可访问菜单 */
  private menus: MenuItem[];
  /** 可访问菜单code */
  private menuCodes: Set<string>;
  /** 可操作code */
  private operatorCodes: Set<string>;

  /**
   * 获取菜单
   */
  protected abstract getMenus(): Observable<MenuItem[]>;

  /**
   * 所有操作
   */
  protected abstract getOperators(): Observable<OperatorItem[]>;

  /**
   * 确认菜单
   * @param code 菜单code
   */
  protected abstract confirmMenu(code: string): boolean;

  /**
   * 确认操作
   * @param code 操作code
   */
  protected abstract confirmOperator(code: string): boolean;


  /**
   * 可访问菜单
   */
  getMenuItems(): Observable<MenuItem[]> {
    if (this.menus) {
      return of(this.menus);
    }
    return this.getMenus().pipe(
      map(menus => this.filterMenu(menus))
    );
  }

  /**
   * 菜单code
   */
  getMenuCodes(): Observable<Set<string>> {
    if (this.menuCodes) {
      return of(this.menuCodes);
    }
    return this.getMenus().pipe(
      map(menus => this.flatMenuToCode(menus)),
      map(codes =>
        codes.filter(code => this.confirmMenu(code))),
      map(codes => new Set<string>(codes)),
      tap(codes => this.menuCodes = codes)
    );
  }

  /**
   * 用户可用操作
   */
  getOperatorCodes(): Observable<Set<string>> {
    if (this.operatorCodes) {
      return of(this.operatorCodes);
    }
    return this.getOperators().pipe(
      map(ops =>
        ops.filter(op => this.confirmOperator(op.code))
          .map(op => op.code)),
      map(codes => new Set<string>(codes)),
      tap(codes => this.operatorCodes = codes)
    );
  }

  /**
   * 可访问菜单
   * @param menus 菜单
   * @param codes 可访问菜单code
   */
  private filterMenu(menus: MenuItem[]): MenuItem[] {
    if (!menus) {
      return [];
    }
    const rets: MenuItem[] = [];
    for (const menu of menus) {
      if (!menu.children || menu.children.length === 0) {
        // 叶子节点
        if (!menu.configurable) {
          rets.push({...menu, children: null});
        } else if (this.confirmMenu(menu.code) && !menu.disabled) {
          rets.push({...menu, children: null});
        }
        continue;
      }
      // 非叶子节点
      const child = this.filterMenu(menu.children);
      if (child.length > 0) {
        rets.push({...menu, children: child});
      }
    }
    return rets;
  }

  /**
   * 可访问的菜单code
   * @param menus 菜单
   */
  private flatMenuToCode(menus: MenuItem[]): string[] {
    if (!menus) {
      return [];
    }
    const urls: string[] = [];
    for (const menu of menus) {
      if (menu.code) {
        urls.push(menu.code);
      }
      urls.push(...this.flatMenuToCode(menu.children));
    }
    return urls;
  }
}

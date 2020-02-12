import {MenuOperatorItem} from './menu-operator-item';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {OperatorItem} from '@commons';

/**
 * 菜单提供器
 */
export abstract class MenuOperatorProvider {
  /** 可访问菜单 */
  private menus: MenuOperatorItem[];
  /** 可访问菜单code */
  private menuCodes: Set<string>;
  /** 可操作code */
  private operatorCodes: Set<string>;

  /**
   * 获取菜单
   */
  protected abstract getMenus(): Observable<MenuOperatorItem[]>;

  /**
   * 所有操作
   */
  protected abstract getOperators(): Observable<OperatorItem[]>;

  /**
   * 确认菜单
   * @param code 菜单code
   */
  abstract confirmMenu(code: string): boolean;

  /**
   * 确认操作
   * @param code 操作code
   */
  abstract confirmOperator(code: string): boolean;


  /**
   * 可访问菜单
   */
  getMenuItems(): Observable<MenuOperatorItem[]> {
    if (this.menus) {
      return of(this.menus);
    }
    return this.getMenus().pipe(
      map(menus => this.filterMenu(menus))
    );
  }

  /**
   * 可访问菜单
   * @param menus 菜单
   * @param codes 可访问菜单code
   */
  private filterMenu(menus: MenuOperatorItem[]): MenuOperatorItem[] {
    if (!menus) {
      return [];
    }
    const rets: MenuOperatorItem[] = [];
    for (const menu of menus) {
      if (!menu.children || menu.children.length === 0) {
        // 叶子
        if (menu.disabled) {
          // 不展示的
        } else if (!menu.configurable) {
          // 不可配置，全部展示
          rets.push({...menu, children: null});
        } else if (this.confirmMenu(menu.code)) {
          // 有权限
          rets.push({...menu, children: null});
        }
      } else {
        // 非叶子
        const child = this.filterMenu(menu.children);
        if (child.length > 0) {
          rets.push({...menu, children: child});
        } else if (this.confirmMenu(menu.code)
          && menu.children.every(item => item.disabled)) {
          rets.push({...menu, children: null});
        }
      }

    }
    return rets;
  }
}

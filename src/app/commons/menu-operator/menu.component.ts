import {Component, OnInit} from '@angular/core';
import {MenuOperatorItem} from './menu-operator-item';
import {NavigationEnd, Router} from '@angular/router';
import {MenuOperatorProvider} from './menu-operator-provider';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  menus: MenuOperatorItem[];

  constructor(private router: Router,
              private menuProvider: MenuOperatorProvider) {
  }

  ngOnInit() {
    this.menuProvider.getMenuItems()
      .subscribe((menus) => {
        this.menus = this.menuHandler(menus);
        this.updateMenu(this.router.url, this.menus);
      });
    // 菜单跟踪
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenu(this.router.url, this.menus);
      }
    });
  }

  /**
   * 激活页面关联的菜单
   * @param url 路径
   * @param menus 菜单
   */
  private updateMenu(url: string, menus: MenuOperatorItem[]): boolean {
    let open = false;
    for (const menu of menus) {
      if (url.startsWith(menu.path)) {
        menu.selected = true;
        menu.open = true;
        open = true;
      } else if (!open && menu.children && menu.children.length > 0) {
        menu.open = this.updateMenu(url, menu.children);
        open = menu.open;
      } else {
        menu.selected = false;
        menu.open = false;
      }
    }
    return open;
  }

  private menuHandler(menus: MenuOperatorItem[], level: number = 0): MenuOperatorItem[] {
    if (!menus) {
      return null;
    }
    const rets: MenuOperatorItem[] = [];
    for (const menu of menus) {
      rets.push({
        ...menu,
        level: level + 1,
        children: this.menuHandler(menu.children, level + 1),
        open: false,
        selected: false
      });
    }
    return rets;
  }

}

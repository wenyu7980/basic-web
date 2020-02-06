import {Component, OnInit} from '@angular/core';
import {MenuItem} from './menu-item';
import {NavigationEnd, Router} from '@angular/router';
import {MenuProvider} from './menu-provider';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  menus: MenuItem[];

  constructor(private router: Router,
              private menuProvider: MenuProvider) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenu(this.router.url, this.menus);
      }
    });
    this.menuProvider.getMenuItems().subscribe((menus) => {
      this.menus = this.menuHandler(menus);
      this.updateMenu(this.router.url, this.menus);
    });
  }

  private updateMenu(url: string, menus: MenuItem[]): boolean {
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

  private menuHandler(menus: MenuItem[], level: number = 0): MenuItem[] {
    if (!menus) {
      return null;
    }
    const rets: MenuItem[] = [];
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

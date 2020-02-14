import {Component, OnInit, ViewChild} from '@angular/core';
import {NzTreeComponent, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {MenuOperatorItem, OperatorItem, PermissionItem} from '@commons';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../../rest/services/role.service';
import {ErrorHandlerService} from '@rest';

@Component({
  selector: 'app-role-create-page',
  templateUrl: './role-save-page.component.html',
  styleUrls: ['./role-save-page.component.less']
})
export class RoleSavePageComponent implements OnInit {
  @ViewChild('Tree', {static: false})
  tree: NzTreeComponent;
  data: NzTreeNodeOptions[];
  /** 选中的keys */
  checkedKeys: string[];
  /** 菜单 */
  menus: MenuOperatorItem[];
  /** 操作 */
  operators: OperatorItem[];

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private roleService: RoleService,
              private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.httpClient.get<OperatorItem[]>('/assets/admin-operator.json')
      .pipe(
        tap(items => this.operators = items),
        map(operators => operators.reduce((ops, op) => {
          ops.set(op.code, op);
          return ops;
        }, new Map<string, OperatorItem>())),
        switchMap(operators => {
          return this.httpClient.get<MenuOperatorItem[]>('/assets/admin-menu.json')
            .pipe(
              tap(items => this.menus = items),
              map(menus => this.mapToNode(menus, operators))
            );
        })
      )
      .subscribe(nodes => {
          this.data = nodes;
        }
      );
    /** 数据获取 */
    this.activatedRoute.queryParamMap
      .pipe(
        debounceTime(500),
        filter(params => params.has('id')),
        switchMap((params) => {
          return this.roleService.getRole(params.get('id'), true);
        })
      )
      .subscribe((detail) => {
        const checkedKeys = this.tree.getCheckedNodeList().map(node => node.key);
        this.checkedKeys = [...checkedKeys, ...detail.menuCodes, ...detail.operatorCodes];
      }, err => {
        if (err.status === 404) {
        } else {
          this.errorHandlerService.handler(err);
        }
      });
  }

  save() {
    const codes = this.fetchMenuOperator(this.tree.getCheckedNodeList());
    const permissions: PermissionItem[] = [];
    permissions.push(...this.fetchPermissionFromMenu(this.menus, new Set<string>(codes.menus)));
    permissions.push(...this.fetchPermissionFromOperator(codes.operators));
    this.roleService.addRole({
      name: '角色1',
      menuCodes: codes.menus,
      operatorCodes: codes.operators,
      permissions: permissions.map(permission => {
        return {method: permission.method, path: permission.path};
      })
    }).subscribe(role => {
      this.router.navigate(['/admin/roles']);
    }, err => {
      this.errorHandlerService.handler(err);
    });

  }

  /**
   * 获取code
   * @param nodeList 节点列表
   */
  fetchMenuOperator(nodeList: NzTreeNode[]): { menus: string[], operators: string[] } {
    const codes: { menus: string[], operators: string[] } = {menus: [], operators: []};
    for (const node of nodeList) {
      if (node.origin.valid) {
        if (node.origin.opFlag) {
          codes.operators.push(node.key);
        } else {
          codes.menus.push(node.key);
        }
      }
      const ret = this.fetchMenuOperator(node.children);
      codes.menus.push(...ret.menus);
      codes.operators.push(...ret.operators);
    }
    return codes;
  }


  private mapToNode(menus: MenuOperatorItem[], operators: Map<string, OperatorItem>) {
    if (!menus) {
      return [];
    }
    const rets: NzTreeNodeOptions[] = [];
    for (const menu of menus) {
      // 处理子节点
      const child = this.mapToNode(menu.children, operators);
      if (menu.operators) {
        for (const op of menu.operators) {
          child.push({
            key: op,
            title: operators.get(op).name,
            isLeaf: true,
            opFlag: true,
            valid: true,
          });
        }
      }
      rets.push({
        key: menu.code || Math.random().toString(),
        title: menu.title,
        disableCheckbox: !menu.configurable && child.length === 0,
        opFlag: false,
        valid: menu.code,
        isLeaf: child.length === 0,
        children: child,
        checked: !menu.configurable && child.length === 0,
        icon: 'menu'
      });
    }
    return rets;
  }

  /**
   * 获取菜单所需的权限
   * @param menus 菜单
   * @param codes 菜单code
   */
  private fetchPermissionFromMenu(menus: MenuOperatorItem[], codes: Set<string>): PermissionItem[] {
    const items: PermissionItem[] = [];
    for (const item of menus) {
      if (codes.has(item.code) && item.permissions) {
        items.push(...item.permissions);
      }
      if (item.children) {
        items.push(...this.fetchPermissionFromMenu(item.children, codes));
      }
    }
    return items;
  }

  private fetchPermissionFromOperator(codes: string[]): PermissionItem[] {
    const sets = new Set<string>(codes);
    const items: PermissionItem[] = [];
    for (const operator of this.operators) {
      if (sets.has(operator.code) && operator.permissions) {
        items.push(...operator.permissions);
      }
    }
    return items;
  }

}

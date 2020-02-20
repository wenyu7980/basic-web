import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzTreeComponent, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {MenuOperatorItem, OperatorItem, PermissionItem, Validators} from '@commons';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService, RoleService} from '@rest';
import {FormBuilder, FormGroup} from '@angular/forms';
import {forkJoin} from 'rxjs';
import {RoleAdd} from '@rest-models';

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
  menuPermissions: Map<string, PermissionItem[]>;
  /** 操作 */
  operatorPermissions: Map<string, PermissionItem[]>;
  /** 角色名称 */
  form: FormGroup;
  private roleId: string;

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private roleService: RoleService,
              private errorHandlerService: ErrorHandlerService,
              private fb: FormBuilder,
              private messageService: NzMessageService) {
    this.form = this.fb.group({
      name: [null, [
        Validators.required('角色名称'),
        Validators.size('角色名称', 2, 20)
      ]]
    });
  }

  ngOnInit() {
    forkJoin(
      this.httpClient.get<OperatorItem[]>('/assets/admin-operator.json')
        .pipe(
          map(operators => operators.reduce(
            (ops, op) =>
              ops.set(op.code, op),
            new Map<string, OperatorItem>())),
          tap(operators => {
            this.operatorPermissions = new Map<string, PermissionItem[]>();
            for (const [key, op] of operators.entries()) {
              this.operatorPermissions.set(key, op.permissions || []);
            }
          })),
      this.httpClient.get<MenuOperatorItem[]>('/assets/admin-menu.json')
        .pipe(tap(menus => this.menuPermissions = this.getMenuPermissionItems(menus)))
    ).subscribe(menuOperator => {
        this.data = this.mapToNode(menuOperator[1], menuOperator[0]);
      }
    );
    /** 数据获取 */
    this.activatedRoute.queryParamMap
      .pipe(
        debounceTime(500),
        filter(params => params.has('id')),
        switchMap((params) => {
          this.roleId = params.get('id');
          return this.roleService.getRole(this.roleId, true);
        })
      )
      .subscribe((detail) => {
        const checkedKeys = this.tree.getCheckedNodeList().map(node => node.key);
        this.checkedKeys = [...checkedKeys, ...detail.menuCodes, ...detail.operatorCodes];
        this.form.patchValue({name: detail.name});
      }, err => {
        if (this.errorHandlerService.notFound(err)) {
          this.roleId = null;
        } else {
          this.errorHandlerService.handler(err);
        }
      });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }
    const codes = this.fetchMenuOperator(this.tree.getCheckedNodeList());
    const permissions: PermissionItem[] = [];
    permissions.push(...this.fetchPermissionFromMenu(codes.menus));
    permissions.push(...this.fetchPermissionFromOperator(codes.operators));
    const role: RoleAdd = {
      name: this.form.value.name,
      menuCodes: codes.menus,
      operatorCodes: codes.operators,
      permissions: permissions.map(permission => {
        return {method: permission.method, path: permission.path};
      })
    };
    if (this.roleId) {
      this.roleService.modifyRole(this.roleId, role).subscribe(
        r => {
          this.messageService.success('修改成功');
          this.router.navigate(['/admin/roles', r.id]);
        }, err => this.errorHandlerService.handler(err));
    } else {
      this.roleService.addRole(role).subscribe(
        r => {
          this.messageService.success('创建成功');
          this.router.navigate(['/admin/roles', r.id]);
        }, err => this.errorHandlerService.handler(err));
    }
  }

  /**
   * 获取菜单权限 code-permission
   * @param menus 菜单
   */
  private getMenuPermissionItems(menus: MenuOperatorItem[]): Map<string, PermissionItem[]> {
    const items = new Map<string, PermissionItem[]>();
    if (menus) {
      for (const menu of menus) {
        if (menu.code) {
          items.set(menu.code, menu.permissions || []);
        }
        for (const [key, value] of this.getMenuPermissionItems(menu.children).entries()) {
          items.set(key, value);
        }
      }
    }
    return items;
  }

  /**
   * 保存
   */


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

  /**
   * 生成node节点
   * @param menus 菜单
   * @param operators 按钮
   */
  private mapToNode(menus: MenuOperatorItem[], operators: Map<string, OperatorItem>) {
    if (!menus) {
      return [];
    }
    const rets: NzTreeNodeOptions[] = [];
    for (const menu of menus) {
      // 处理子节点
      const child = this.mapToNode(menu.children, operators);
      // 添加按钮
      if (menu.operators) {
        for (const op of menu.operators) {
          child.push({
            key: op,
            title: operators.get(op).name,
            isLeaf: true,
            /** 是否是操作 */
            opFlag: true,
            valid: true,
          });
        }
      }
      // 添加菜单
      rets.push({
        key: menu.code || Math.random().toString(),
        title: menu.title,
        disableCheckbox: !menu.configurable,
        opFlag: false,
        /** 是否是有code */
        valid: menu.code,
        isLeaf: child.length === 0,
        children: child,
        checked: !menu.configurable,
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
  private fetchPermissionFromMenu(codes: string[]): PermissionItem[] {
    const permissions = new Array<PermissionItem>();
    for (const code of codes) {
      permissions.push(...this.menuPermissions.get(code));
    }
    return permissions;
  }

  /**
   * 获取操作所需权限
   * @param codes 操作code
   */
  private fetchPermissionFromOperator(codes: string[]): PermissionItem[] {
    const permissions = new Array<PermissionItem>();
    for (const code of codes) {
      permissions.push(...this.operatorPermissions.get(code));
    }
    return permissions;
  }
}

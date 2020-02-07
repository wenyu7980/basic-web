import {Component, OnInit, ViewChild} from '@angular/core';
import {NzTreeComponent, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {MenuItem, OperatorItem} from '@commons';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-role-create-page',
  templateUrl: './role-create-page.component.html',
  styleUrls: ['./role-create-page.component.less']
})
export class RoleCreatePageComponent implements OnInit {
  data: NzTreeNodeOptions[];
  @ViewChild('Tree', {static: false})
  tree: NzTreeComponent;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<OperatorItem[]>('/assets/admin-operator.json')
      .pipe(
        map(operators => operators.reduce((ops, op) => {
          ops.set(op.code, op);
          return ops;
        }, new Map<string, OperatorItem>())),
        switchMap(operators => {
          return this.httpClient.get<MenuItem[]>('/assets/admin-menu.json')
            .pipe(
              map(menus => this.mapToNode(menus, operators))
            );
        })
      )
      .subscribe(nodes => this.data = nodes);
  }

  save() {
    const codes = {menus: [], operators: []};
    this.fetchMenuOperator(this.tree.getCheckedNodeList(), codes);
  }

  fetchMenuOperator(nodeList: NzTreeNode[], codes: { menus: string[], operators: string[] }) {
    for (const node of nodeList) {
      if (node.origin.valid) {
        if (node.origin.opFlag) {
          codes.operators.push(node.key);
        } else {
          codes.menus.push(node.key);
        }
      }
      this.fetchMenuOperator(node.children, codes);
    }
  }

  /**
   * 转换
   * @param menus
   * @param operators
   */
  private mapToNode(menus: MenuItem[], operators: Map<string, OperatorItem>) {
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


}

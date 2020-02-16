import {Component, OnInit} from '@angular/core';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {ErrorHandlerService, RoleService} from '@rest';
import {forkJoin} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MenuOperatorItem, OperatorItem} from '@commons';
import {RoleDetail} from '@rest-models';

@Component({
  selector: 'app-role-detail-page',
  templateUrl: './role-detail-page.component.html',
  styleUrls: ['./role-detail-page.component.less']
})
export class RoleDetailPageComponent implements OnInit {

  data: NzTreeNodeOptions[];

  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap((params: { id: string }) => forkJoin(
        this.httpClient.get('/assets/admin-menu.json'),
        this.httpClient.get('/assets/admin-operator.json')
          .pipe(map((operetors: OperatorItem[]) =>
            operetors.reduce(
              (ops, op) => ops.set(op.code, op),
              new Map<string, OperatorItem>()))),
        this.roleService.getRole(params.id, true)
      ))
    ).subscribe((detail) => {
      this.data = this.getMenuNode(detail[0] as MenuOperatorItem[], detail[1], detail[2]);
    }, err => this.errorHandlerService.handler(err));
  }

  private getMenuNode(
    menus: MenuOperatorItem[],
    operators: Map<string, OperatorItem>,
    role: RoleDetail): NzTreeNodeOptions[] {
    if (!menus) {
      return [];
    }
    const options = new Array<NzTreeNodeOptions>();
    for (const menu of menus) {
      if (menu.code && !role.menuCodes.includes(menu.code)) {
        continue;
      }
      const child = this.getMenuNode(menu.children, operators, role);
      if (menu.operators) {
        for (const op of menu.operators) {
          if (role.operatorCodes.includes(op)) {
            child.push({
              key: op,
              title: operators.get(op).name,
              isLeaf: true
            });
          }
        }
      }
      options.push({
        key: menu.code,
        title: menu.title,
        children: child,
        isLeaf: child.length === 0,
        icon: 'menu'
      });
    }
    return options;
  }
}

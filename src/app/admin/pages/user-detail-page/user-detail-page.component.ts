import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ErrorHandlerService, UserService} from '@rest';
import {UserDetail} from '@rest-models';
import {HttpErrorResponse} from '@angular/common/http';
import {MenuOperators} from '@commons';
import {TabDetailTemplate} from '../../../commons/template/tab-detail-template';

@MenuOperators([
  {
    code: 'userDelete',
    show: (value: UserDetail) => !value.deletedFlag
  }, {
    code: 'userRoleSet',
    show: (value: UserDetail) => !value.deletedFlag
  }
])
@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.less']
})
export class UserDetailPageComponent extends TabDetailTemplate implements OnInit {
  detail: UserDetail;
  selectedIndex: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NzModalService,
    private userService: UserService,
    private errorService: ErrorHandlerService,
    private messageService: NzMessageService,
  ) {
    super([null, 'user', 'admin', null], router, activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();
    this.activatedRoute.params
      .subscribe((params: { id: string }) => {
        this.initPage(params.id);
      });
  }

  private initPage(id: string) {
    this.userService.getUser(id, true)
      .subscribe((user: UserDetail) => {
        this.detail = user;
      }, (err: HttpErrorResponse) => {
        this.errorService.handler(err, '/admin/users');
      });
  }

  removeUser() {
    const ref = this.modalService.confirm({
      nzTitle: `确认删除用户${this.detail.username}?`,
      nzOkText: '确认',
      nzCancelText: '取消',
      nzOnOk: (value) => {
        this.userService.removeUser(this.detail.id).subscribe(
          () => {
            this.messageService.success('用户删除成功');
            this.initPage(this.detail.id);
          }, (err) => {
            this.errorService.handler(err);
          });
      }
    });
  }
}


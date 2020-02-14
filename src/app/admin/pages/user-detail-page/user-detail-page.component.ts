import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ErrorHandlerService, UserService} from '@rest';
import {UserDetail} from '@rest-models';
import {HttpErrorResponse} from '@angular/common/http';
import {MenuOperators} from '@commons';

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
export class UserDetailPageComponent implements OnInit {
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
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: { id: string }) => {
        this.initPage(params.id);
      });
    this.activatedRoute.queryParams
      .subscribe((params: { tab: string }) => {
        if (params.tab === 'department') {
          this.selectedIndex = 1;
        } else {
          this.selectedIndex = 0;
          this.router.navigate([]);
        }
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

  selectIndexChange(i: number) {
    if (i === 1) {
      this.router.navigate([], {
        queryParams: {
          tab: 'department',
          index: i,
          size: 10
        }
      });
    } else {
      this.router.navigate([]);
    }

  }
}

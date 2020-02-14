import {Component, OnInit} from '@angular/core';
import {MenuOperators, TableData, TableQueryParam, TableTemplate, Validators} from '@commons';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {debounceTime, map} from 'rxjs/operators';
import {ErrorHandlerService, UserService} from '@rest';
import {User, UserListDetail} from '@rest-models';

@MenuOperators([
  {code: 'userAdd', show: () => true}
])
@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-table-page.component.html',
  styleUrls: ['./user-table-page.component.less']
})
export class UserTablePageComponent extends TableTemplate<UserListDetail, TableQueryParam> implements OnInit {
  userAddModal: {
    form: FormGroup,
    visible: boolean,
    loading: boolean
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private messageService: NzMessageService,
              private errorService: ErrorHandlerService,
              private userService: UserService,
  ) {
    super(router, activatedRoute);
    this.userAddModal = {
      visible: false,
      form: this.fb.group({
        username: [null, [
          Validators.required('用户名'),
          Validators.size('用户名', 6, 18)
        ]],
        name: [null, [
          Validators.required('姓名'),
          Validators.size('姓名', 2, 6)
        ]],

        password: [null, [
          Validators.required('密码'),
          Validators.size('密码', 6, 18)
        ]],
        confirm: [null, [Validators.required('确认密码'),
          Validators.size('确认密码', 6, 18)
        ]]
      }),
      loading: false
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.userAddModal.form.get('confirm')
      .valueChanges.pipe(debounceTime(100))
      .subscribe(value => {
        if (this.userAddModal.form.value.password !== value) {
          this.userAddModal.form.get('confirm')
            .setErrors({confirm: '密码与确认密码不一致'});
        }
      });
  }

  protected setParam(param: TableQueryParam): boolean {
    return false;
  }

  protected getParam(): TableQueryParam {
    return {};
  }

  protected getData(param: TableQueryParam):
    Observable<TableData<UserListDetail>> {
    return this.userService.getUsers({
      ...param,
      detail: true,
      index: param.index - 1
    }).pipe(
      map((body) => {
        return {
          total: body.count,
          data: body.data
        };
      })
    );
  }

  protected errorHandler(err: HttpErrorResponse) {
    this.errorService.handler(err);
  }

  userAdd() {
    if (this.userAddModal.form.invalid) {
      this.userAddModal.form.markAsDirty();
      return;
    }
    this.userAddModal.loading = true;
    const value = this.userAddModal.form.getRawValue();
    this.userService.addUser({
      username: value.username,
      name: value.name,
      password: value.password
    }).subscribe((user: User) => {
      this.userAddModal.visible = false;
      this.userAddModal.loading = false;
      this.router.navigate(['/admin/users', user.id]);
    }, err => {
      this.errorService.handler(err, '/admin/users');
    });
  }
}

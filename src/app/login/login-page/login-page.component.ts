import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorHandlerService, LoginService, UserService} from '@rest';
import {LoginResult} from '@rest-models';
import {HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginResultCache} from '@commons';
import {RoleMenuOperatorCache} from '../../commons/cache/role-menu-operator-cache';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: NzMessageService,
    private fb: FormBuilder,
    private resultCache: LoginResultCache,
    private roleMenuCache: RoleMenuOperatorCache,
    private errorService: ErrorHandlerService,
    private userService: UserService,
  ) {
    this.form = this.fb.group(
      {
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
      }
    );
  }

  ngOnInit() {
  }

  /**
   * 用户登录
   */
  login() {
    if (this.form.invalid) {
      this.form.markAsDirty();
      this.messageService.error('请输入正确的用户名密码');
      return;
    }
    this.loginService.login(
      {
        username: this.form.value.username,
        password: this.form.value.password
      }).subscribe((result: LoginResult) => {
      this.resultCache.setValue(result);
      this.userService.getUserMenuOperator()
        .subscribe((operator) => {
          this.roleMenuCache.setValue(operator);
        });
      this.router.navigate(['/admin/home']);
    }, (err: HttpErrorResponse) => {
      this.errorService.handler(err, '/login');
    });
  }
}

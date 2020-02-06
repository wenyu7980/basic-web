import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * 用户登录
   */
  login() {
    this.router.navigate(['/admin/home']);
  }
}

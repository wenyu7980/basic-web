import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private router: Router,
    private messageService: NzMessageService) {
  }

  handler(response: HttpErrorResponse, url: string = '') {
    switch (response.status) {
      case 401:
        this.messageService.error('登录失效，请重新登录');
        this.router.navigate(['/login']);
        return;
      case 404:
        if (response.error.message) {
          this.messageService.error(response.error.message);
        } else {
          this.messageService.error('网路异常，请联系管理员');
          return;
        }
        break;
      case 403:
        this.messageService.error('权限不足，请联系管理员');
        console.log(response.error.message);
        break;
      default:
        this.messageService.error(response.error.message);
        return;
    }
    if (url && url.length > 0) {
      this.router.navigate([url]);
    }
  }
}

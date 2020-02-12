import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResultCache} from '@commons';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private resultCache: LoginResultCache) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('assets')) {
      return next.handle(req);
    }
    const request = req.clone({
      headers: req.headers.set(
        'token', [this.resultCache.getValue() &&
        this.resultCache.getValue().headerToken]
      )
    });
    return next.handle(request);
  }

}

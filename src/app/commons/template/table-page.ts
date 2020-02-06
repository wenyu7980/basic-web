/**
 * table page模板
 */
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {OnInit} from '@angular/core';

export abstract class TablePage<T> implements OnInit {

  /** 数据 */
  data: T[];
  /** 页码 */
  pageIndex: number;
  /** 页数 */
  pageSize: number;
  /** 总数据数 */
  total: number;
  /** 是否在加载中 */
  loading: boolean;
  /** 汇总路径参数变化 */
  private subscriber: Subscriber<TableQueryParam>;

  constructor(private route: Router,
              private activated: ActivatedRoute,
              private readonly PAGE_SIZE: number = 20) {
    this.pageIndex = 1;
    this.pageSize = PAGE_SIZE;
  }

  ngOnInit(): void {
    // 参数变化处理
    const observable =
      new Observable((subscriber: Subscriber<TableQueryParam>) => {
        this.subscriber = subscriber;
      });
    observable.pipe(
      filter(queryParam => {
        if (this.setIndexPage(queryParam.index, queryParam.size) && this.setParam(queryParam)) {
          return true;
        }
        this.navigate({...this.getParam(), index: this.pageIndex, size: this.pageSize});
        return false;
      }),
      switchMap(queryParam => this.getData(queryParam))
    ).subscribe((body: TableData<T>) => {
      this.total = body.total;
      this.data = body.data;
    }, (error) => {
      this.errorHandler(error);
    });
    // 路径参数变化
    this.activated.queryParams
      .subscribe((param: TableQueryParam) => {
        this.subscriber.next(param);
      }, (error) => this.errorHandler(error));
  }

  /**
   * 获取参数
   */
  protected abstract getParam(): TableQueryParam;

  /**
   * 设置参数
   * @param param 参数
   * @return 如果参数都合法，则返回true
   *         如果参数有不合法的，则设定好变量后，返回false
   */
  protected abstract setParam(param: TableQueryParam): boolean;

  /**
   * 获取数据
   * @param param 参数
   */
  protected abstract getData(param: TableQueryParam): Observable<TableData<T> | HttpErrorResponse>;

  /**
   * 数据请求错误处理
   * @param error 错误信息
   */
  protected abstract errorHandler(error: HttpErrorResponse);

  private setIndexPage(index: number, size: number): boolean {
    if (+index && +size) {
      this.pageIndex = index;
      this.pageSize = size;
      return true;
    }
    if (!+index) {
      this.pageIndex = 1;
    }
    if (!+size) {
      this.pageSize = this.PAGE_SIZE;
    }
    return false;
  }

  protected navigate(param: TableQueryParam) {
    this.route.navigate([], {queryParams: param});
  }

  pageIndexChange(i: number) {
    this.pageIndex = i;
    this.navigate({
      ...this.getParam(),
      index: this.pageIndex,
      size: this.pageSize
    });
  }

  pageSizeChange(s: number) {
    this.pageSize = s;
    this.navigate({
      ...this.getParam(),
      index: 1,
      size: this.pageSize
    });
  }
}

export interface TableQueryParam {
  index?: number;
  size?: number;

  [propName: string]: any;
}

export interface TableData<T> {
  total: number;
  data: T[];
}

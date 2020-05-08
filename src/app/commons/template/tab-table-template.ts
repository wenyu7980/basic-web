import {TableQueryParam, TableTemplate} from './table-template';
import {ActivatedRoute, Router} from '@angular/router';
import { Input, Directive } from '@angular/core';

@Directive()
export abstract class TabTableTemplate<T, P extends TabTableQueryParam> extends TableTemplate<T, P> {
  @Input()
  tab: string;

  protected constructor(
    route: Router,
    activated: ActivatedRoute,
    PAGE_SIZE: number = 20) {
    super(route, activated, PAGE_SIZE);
  }

  protected filter(params: TabTableQueryParam): boolean {
    return params.tab === this.tab;
  }
}

export interface TabTableQueryParam extends TableQueryParam {
  tab: string;
}

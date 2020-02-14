import {ActivatedRoute, Router} from '@angular/router';
import {OnInit} from '@angular/core';

export abstract class TabDetailTemplate implements OnInit {
  /** tab index start 0 */
  selectedIndex: number;

  private readonly tabList: TabListItem[] = [];

  protected constructor(
    tabs: string[],
    private r: Router,
    private  a: ActivatedRoute) {
    tabs.forEach((t, i) => {
      this.tabList.push({index: i, tab: t});
    });
  }

  ngOnInit(): void {
    this.a.queryParams
      .subscribe((params: { tab: string }) => {
        for (const item of this.tabList) {
          if (item.tab === params.tab) {
            this.selectedIndex = item.index;
            return;
          }
        }
        this.r.navigate([]);
      });
  }

  selectIndexChange(i: number) {
    this.selectedIndex = i;
    this.r.navigate([], {
      queryParams: {...this.a.snapshot.queryParams, tab: this.tabList[i].tab}
    });
  }
}

interface TabListItem {
  tab: string;
  index?: number;
}

import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../../../commons/menu/menu-item';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent implements OnInit {
  menus: MenuItem[];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get('/assets/admin-menu.json')
      .subscribe((body: MenuItem[]) => {
        this.menus = body;
      });
  }

}

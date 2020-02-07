import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-role-table-page',
  templateUrl: './role-table-page.component.html',
  styleUrls: ['./role-table-page.component.less']
})
export class RoleTablePageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * 创建角色
   */
  roleCreate() {
    this.router.navigate(['/admin/roles/create']);
  }
}

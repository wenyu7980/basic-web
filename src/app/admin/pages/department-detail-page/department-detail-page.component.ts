import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentDetail} from '@rest-models';
import {DepartmentService} from '@rest';
import {TabDetailTemplate} from '@commons';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-department-detail-page',
  templateUrl: './department-detail-page.component.html',
  styleUrls: ['./department-detail-page.component.less']
})
export class DepartmentDetailPageComponent extends TabDetailTemplate implements OnInit {
  detail: DepartmentDetail;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private departmentService: DepartmentService) {
    super([null, 'sub'], router, activatedRoute);
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(switchMap(params =>
        this.departmentService.getDeparment(params.get('id'), true)
      ))
      .subscribe(detail => {
        this.detail = detail;
      });
  }

}

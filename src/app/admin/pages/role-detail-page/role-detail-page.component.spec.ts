import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDetailPageComponent } from './role-detail-page.component';

describe('RoleDetailPageComponent', () => {
  let component: RoleDetailPageComponent;
  let fixture: ComponentFixture<RoleDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

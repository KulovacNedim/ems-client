import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleNotSetComponent } from './role-not-set.component';

describe('RoleNotSetComponent', () => {
  let component: RoleNotSetComponent;
  let fixture: ComponentFixture<RoleNotSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleNotSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleNotSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

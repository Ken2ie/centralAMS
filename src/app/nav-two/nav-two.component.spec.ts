import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTwoComponent } from './nav-two.component';

describe('NavTwoComponent', () => {
  let component: NavTwoComponent;
  let fixture: ComponentFixture<NavTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

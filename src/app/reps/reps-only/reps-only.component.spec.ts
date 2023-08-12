import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepsOnlyComponent } from './reps-only.component';

describe('RepsOnlyComponent', () => {
  let component: RepsOnlyComponent;
  let fixture: ComponentFixture<RepsOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepsOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepsOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

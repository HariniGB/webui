import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayrestaurantComponent } from './displayrestaurant.component';

describe('DisplayrestaurantComponent', () => {
  let component: DisplayrestaurantComponent;
  let fixture: ComponentFixture<DisplayrestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayrestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

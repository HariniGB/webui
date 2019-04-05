import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectrestaurantComponent } from './selectrestaurant.component';

describe('SelectrestaurantComponent', () => {
  let component: SelectrestaurantComponent;
  let fixture: ComponentFixture<SelectrestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectrestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

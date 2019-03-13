import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrestaurantComponent } from './editrestaurant.component';

describe('EditrestaurantComponent', () => {
  let component: EditrestaurantComponent;
  let fixture: ComponentFixture<EditrestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmenusComponent } from './listmenus.component';

describe('ListmenusComponent', () => {
  let component: ListmenusComponent;
  let fixture: ComponentFixture<ListmenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtablesComponent } from './listtables.component';

describe('ListtablesComponent', () => {
  let component: ListtablesComponent;
  let fixture: ComponentFixture<ListtablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveupdateComponent } from './liveupdate.component';

describe('LiveupdateComponent', () => {
  let component: LiveupdateComponent;
  let fixture: ComponentFixture<LiveupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

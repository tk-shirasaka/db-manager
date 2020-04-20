import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsSidebarComponent } from './sidebar.component';

describe('PartsSidebarComponent', () => {
  let component: PartsSidebarComponent;
  let fixture: ComponentFixture<PartsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

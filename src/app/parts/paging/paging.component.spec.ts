import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaartsPagingComponent } from './paging.component';

describe('PaartsPagingComponent', () => {
  let component: PaartsPagingComponent;
  let fixture: ComponentFixture<PaartsPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaartsPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaartsPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

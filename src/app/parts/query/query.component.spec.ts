import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsQueryComponent } from './query.component';

describe('PartsQueryComponent', () => {
  let component: PartsQueryComponent;
  let fixture: ComponentFixture<PartsQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

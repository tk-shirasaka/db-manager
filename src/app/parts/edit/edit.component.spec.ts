import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsEditComponent } from './edit.component';

describe('PartsEditComponent', () => {
  let component: PartsEditComponent;
  let fixture: ComponentFixture<PartsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

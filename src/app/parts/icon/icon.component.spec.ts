import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsIconComponent } from './icon.component';

describe('PartsIconComponent', () => {
  let component: PartsIconComponent;
  let fixture: ComponentFixture<PartsIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

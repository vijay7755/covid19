import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalConfrimedComponent } from './total-confrimed.component';

describe('TotalConfrimedComponent', () => {
  let component: TotalConfrimedComponent;
  let fixture: ComponentFixture<TotalConfrimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalConfrimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalConfrimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColumnsTableComponent } from './two-columns-table.component';

describe('TwoColumnsTableComponent', () => {
  let component: TwoColumnsTableComponent;
  let fixture: ComponentFixture<TwoColumnsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoColumnsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumnsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

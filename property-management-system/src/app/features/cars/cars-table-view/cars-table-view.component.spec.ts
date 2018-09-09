import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsTableViewComponent } from './cars-table-view.component';

describe('CarsTableViewComponent', () => {
  let component: CarsTableViewComponent;
  let fixture: ComponentFixture<CarsTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

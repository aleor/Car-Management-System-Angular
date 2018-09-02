import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCardViewComponent } from './properties-card-view.component';

describe('PropertiesCardViewComponent', () => {
  let component: PropertiesCardViewComponent;
  let fixture: ComponentFixture<PropertiesCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesCardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

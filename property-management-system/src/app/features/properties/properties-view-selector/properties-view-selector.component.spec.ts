import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesViewSelectorComponent } from './properties-view-selector.component';

describe('PropertiesViewSelectorComponent', () => {
  let component: PropertiesViewSelectorComponent;
  let fixture: ComponentFixture<PropertiesViewSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesViewSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesViewSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

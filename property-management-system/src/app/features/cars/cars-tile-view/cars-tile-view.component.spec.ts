import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsTileViewComponent } from './cars-tile-view.component';

describe('Cars Tile View Component', () => {
  let component: CarsTileViewComponent;
  let fixture: ComponentFixture<CarsTileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsTileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsTileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

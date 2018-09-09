import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Car } from '../../shared/models/car.model';
import { ViewMode } from './view-mode.enum';
import { FilterService } from '../../core/services/filter.service';

@Component({
  selector: 'pms-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  selectedViewMode: ViewMode = ViewMode.Tile;
  viewMode = ViewMode;
  cars: Car[] = [];
  filteredCars: Car[] = [];
  constructor(
    private dataService: DataService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.dataService.getCars().subscribe(res => {
      this.cars = res;
      this.filteredCars = res; 
    });
  }

  applyFilter(searchString: string) {
    if (!searchString) {
      this.filteredCars = this.cars;
    }
    searchString = searchString.toUpperCase();
    const propsToFilterBy = ['model', 'type', 'address.city'];
    this.filteredCars = this.filterService.filter<Car>(this.cars, searchString, propsToFilterBy);
  }

  changeViewMode(newMode: any) {
    this.selectedViewMode = newMode;
  }
}

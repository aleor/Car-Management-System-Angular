import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Car } from '../../shared/models/car.model';
import { ViewMode } from './view-mode.enum';
import { FilterService } from '../../core/services/filter.service';
import { PagedResults } from '../../shared/models/paged-results.model';

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

  private totalRecords: number;
  private defaultPageSize = 10;

  constructor(
    private dataService: DataService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.getCarsPage(1);
  }

  getCarsPage(page: number) {
    this.dataService.takeCars((page - 1) * this.defaultPageSize, this.defaultPageSize)
        .subscribe((response: PagedResults<Car[]>) => {
          this.cars = response.results;
          this.filteredCars = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => {console.log(err)});
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

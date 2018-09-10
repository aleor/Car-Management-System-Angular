import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Car } from '../../shared/models/car.model';
import { ViewMode } from './view-mode.enum';
import { FilterService } from '../../core/services/filter.service';
import { PagedResults } from '../../shared/models/paged-results.model';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';

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

  totalRecords: number;
  pageSize = 10;

  searchString = '';

  private currentPage = 0;

  constructor(
    private dataService: DataService,
    private filterService: FilterService,
    private router: Router) { }

  ngOnInit() {
    this.getCarsPage(this.currentPage);
  }

  getCarsPage(page: number) {
    this.dataService.takeCars(page * this.pageSize, this.pageSize)
        .subscribe((response: PagedResults<Car[]>) => {
          this.cars = response.results;
          this.filteredCars = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => {console.log(err)});
  }

  applyFilter() {
    console.log('apply');
    if (!this.searchString) {
      this.filteredCars = this.cars;
    }
    const filterBy = this.searchString.toUpperCase();
    const propsToFilterBy = ['model', 'type', 'address.city'];
    this.filteredCars = this.filterService.filter<Car>(this.cars, filterBy, propsToFilterBy);
  }

  changeViewMode(newMode: any) {
    this.selectedViewMode = newMode;
  }

  onPageParamsChanged(params: PageEvent) {
    if (this.pageSize !== params.pageSize || this.currentPage !== params.pageIndex) {
      this.pageSize = params.pageSize;
      this.getCarsPage(params.pageIndex);
      this.clearFilter();
    }
  }

  clearFilter(): any {
    this.searchString = '';
    this.applyFilter();
  }

  addNewCar() {
    this.router.navigate(['/car/0/edit']);
  }
}

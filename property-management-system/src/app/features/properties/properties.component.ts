import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Property } from '../../shared/models/property.model';
import { Car } from '../../shared/models/car.model';
import { PropertiesViewMode } from './properties-view-mode.enum';
import { FilterService } from '../../core/services/filter.service';

@Component({
  selector: 'pms-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];
  selectedViewMode: PropertiesViewMode = PropertiesViewMode.Card;
  viewMode = PropertiesViewMode;
  cars: Car[] = [];
  filteredCars: Car[] = [];
  constructor(
    private dataService: DataService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.getProperties();
    this.getCars();
  }

  getProperties() {
    this.dataService.getProperties().subscribe(res => this.properties = res);
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

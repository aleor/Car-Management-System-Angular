import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Property } from '../../shared/models/property.model';
import { Car } from '../../shared/models/car.model';

@Component({
  selector: 'pms-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];
  cars: Car[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getProperties();
    this.getCars();
  }

  getProperties() {
    this.dataService.getProperties().subscribe(res => this.properties = res);
  }

  getCars() {
    this.dataService.getCars().subscribe(res => this.cars = res);
  }

  applyFilter(filterBy: string) {
    console.log(filterBy);
  }

}

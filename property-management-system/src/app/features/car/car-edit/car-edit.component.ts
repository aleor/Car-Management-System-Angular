import { Component, OnInit } from '@angular/core';
import { Car } from '../../../shared/models/car.model';
import { CarTypes } from '../../../shared/models/types.const';

@Component({
  selector: 'pms-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  car: Car = new Car();
  carTypes = CarTypes;

  constructor() { }

  ngOnInit() {
  }

}

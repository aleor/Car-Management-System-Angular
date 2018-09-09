import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../../../shared/models/car.model';

@Component({
  selector: 'pms-cars-table-view',
  templateUrl: './cars-table-view.component.html',
  styleUrls: ['./cars-table-view.component.scss']
})
export class CarsTableViewComponent implements OnInit {
  @Input() cars: Car[] = [];
  constructor() { }

  ngOnInit() {
  }

}

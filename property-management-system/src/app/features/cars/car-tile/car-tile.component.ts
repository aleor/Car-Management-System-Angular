import { Component, Input } from '@angular/core';
import { Car } from '../../../shared/models/car.model';

@Component({
  selector: 'pms-car-tile',
  templateUrl: './car-tile.component.html',
  styleUrls: ['./car-tile.component.scss']
})
export class CarTileComponent {
  @Input() car: Car;
  
  constructor() { }
}

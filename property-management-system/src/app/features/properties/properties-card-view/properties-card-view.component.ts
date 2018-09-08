import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../shared/models/property.model';
import { Car } from '../../../shared/models/car.model';

@Component({
  selector: 'pms-properties-card-view',
  templateUrl: './properties-card-view.component.html',
  styleUrls: ['./properties-card-view.component.scss']
})
export class PropertiesCardViewComponent implements OnInit {

  @Input() properties: Car[] = [];
  constructor() { }

  ngOnInit() {
  }

}

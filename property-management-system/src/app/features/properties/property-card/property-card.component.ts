import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../shared/models/property.model';

@Component({
  selector: 'pms-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {

  @Input() property: Property;
  
  constructor() { }

  ngOnInit() {
  }

}

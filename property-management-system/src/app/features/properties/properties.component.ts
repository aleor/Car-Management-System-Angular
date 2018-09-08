import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Property } from '../../shared/models/property.model';

@Component({
  selector: 'pms-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties() {
    this.dataService.getProperties().subscribe(res => this.properties = res);
  }

}

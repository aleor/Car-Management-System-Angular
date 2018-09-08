import { Component, OnInit } from '@angular/core';
import { PropertiesViewMode } from '../properties-view-mode.enum';

@Component({
  selector: 'pms-properties-view-selector',
  templateUrl: './properties-view-selector.component.html',
  styleUrls: ['./properties-view-selector.component.scss']
})
export class PropertiesViewSelectorComponent implements OnInit {

  viewMode: PropertiesViewMode;
  propertiesViewMode: PropertiesViewMode = PropertiesViewMode.Card;
  constructor() { }

  ngOnInit() {
  }

  changeViewMode(setMode: PropertiesViewMode) {
    console.log(setMode);
  }

}

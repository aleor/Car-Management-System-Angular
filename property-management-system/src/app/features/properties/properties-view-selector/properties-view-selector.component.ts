import { Component, Output, EventEmitter } from '@angular/core';
import { PropertiesViewMode } from '../properties-view-mode.enum';

@Component({
  selector: 'pms-properties-view-selector',
  templateUrl: './properties-view-selector.component.html',
  styleUrls: ['./properties-view-selector.component.scss']
})
export class PropertiesViewSelectorComponent {

  @Output() viewModeChanged: EventEmitter<PropertiesViewMode> = new EventEmitter<PropertiesViewMode>();

  viewMode = PropertiesViewMode;

  constructor() { }

  changeViewMode(newMode: any) {
    this.viewModeChanged.emit(newMode);
  }

}

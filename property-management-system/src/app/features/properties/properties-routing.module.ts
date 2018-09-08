import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertiesComponent } from './properties.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertiesCardViewComponent } from './properties-card-view/properties-card-view.component';
import { PropertiesViewSelectorComponent } from './properties-view-selector/properties-view-selector.component';
// import { CustomersCardComponent } from './customers-card.component';
// import { CustomersGridComponent } from './customers-grid.component';

const routes: Routes = [
  { path: '', component: PropertiesComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PropertiesRoutingModule {
  static components = [ 
      PropertiesComponent, 
      PropertyCardComponent,
      PropertiesCardViewComponent,
      PropertiesViewSelectorComponent //, CustomersGridComponent 
    ];
}
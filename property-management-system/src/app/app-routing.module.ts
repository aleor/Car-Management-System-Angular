import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/cars' },
  // { path: 'property/:id', loadChildren: 'app/features/properties/properties.module#PropertiesModule' },
  { path: 'cars', loadChildren: 'app/features/cars/cars.module#CarsModule' },
  // { path: 'bookings', loadChildren: 'app/features/bookings/bookings.module' },
  { path: '**', pathMatch: 'full', redirectTo: '/cars' }
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
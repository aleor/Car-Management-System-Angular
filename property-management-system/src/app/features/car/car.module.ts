import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { CarRoutingModule } from './car-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CarRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  declarations: [CarRoutingModule.components]
})
export class CarModule { }

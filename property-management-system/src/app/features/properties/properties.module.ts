import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { PropertiesRoutingModule } from './properties-routing.module';
import { DataService } from '../../core/services/data.service';
import { FilterService } from '../../core/services/filter.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    PropertiesRoutingModule
  ],
  declarations: [PropertiesRoutingModule.components],
  providers: [
    DataService,
    FilterService 
  ]
})
export class PropertiesModule { }

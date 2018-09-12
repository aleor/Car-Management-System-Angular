import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../angular-material.module';
import { CarsRoutingModule } from './cars-routing.module';
import { DataService } from '../../core/services/data.service';
import { FilterService } from '../../core/services/filter.service';
import { RouterModule } from '@angular/router';
import { FakeDataService } from '../../core/services/fake-data.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    CarsRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [CarsRoutingModule.components],
  providers: [
    DataService,
    FilterService,
    FakeDataService
  ]
})
export class CarsModule { }

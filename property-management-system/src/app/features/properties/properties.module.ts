import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { PropertiesRoutingModule } from './properties-routing.module';
import { DataService } from '../../core/services/data.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    PropertiesRoutingModule
  ],
  declarations: [PropertiesRoutingModule.components],
  providers: [ DataService ]
})
export class PropertiesModule { }

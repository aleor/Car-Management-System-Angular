import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { PaginationModule } from './pagination/pagination.module';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';

@NgModule({
  imports: [
    PaginationModule,
    CommonModule,
    AngularMaterialModule
  ],
  exports: [PaginationModule, DateFormatterPipe, DialogModalComponent],
  declarations: [DateFormatterPipe, DialogModalComponent],
  entryComponents: [DialogModalComponent]
})
export class SharedModule { }

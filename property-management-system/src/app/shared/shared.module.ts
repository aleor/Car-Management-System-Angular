import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from './pagination/pagination.module';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';

@NgModule({
  imports: [
    PaginationModule,
    CommonModule
  ],
  exports: [PaginationModule, DateFormatterPipe],
  declarations: [DateFormatterPipe]
})
export class SharedModule { }

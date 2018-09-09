import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from './pagination/pagination.module';

@NgModule({
  imports: [
    PaginationModule,
    CommonModule
  ],
  exports: [PaginationModule]
})
export class SharedModule { }

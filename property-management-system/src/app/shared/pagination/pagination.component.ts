import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'pms-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Input() pageSizeOptions = [5, 10, 25];

  @Output() pageChanges: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor() { }

  pageParamChanged(some: PageEvent) {
    this.pageChanges.emit(some);
  }
}

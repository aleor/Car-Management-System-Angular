import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datetransform' })
export class DateFormatterPipe implements PipeTransform {
  transform(value: any) {
    if (!value) { return ''; }

    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }
}

import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
 } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  declarations: []
})
export class AngularMaterialModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from './car.component';
import { CarHistoryComponent } from './car-history/car-history.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { AuthGuard } from '../../core/guards/auth.guard';
// import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CarComponent,
    children: [
      { path: 'history', component: CarHistoryComponent },
      { path: 'details', component: CarDetailsComponent },
      {
        path: 'edit',
        component: CarEditComponent,
        canActivate: [ AuthGuard ],
        // canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,
    // CanDeactivateGuard
]
})
export class CarRoutingModule {
  static components = [
      CarComponent,
      CarHistoryComponent,
      CarDetailsComponent,
      CarEditComponent
    ];
}


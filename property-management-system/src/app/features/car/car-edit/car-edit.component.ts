import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Car } from '../../../shared/models/car.model';
import { CarTypes } from '../../../shared/models/types.const';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { NgForm, FormControl } from '@angular/forms';
import { Address } from '../../../shared/models/address.model';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'pms-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  @ViewChild('carForm') carForm: NgForm;
  car = new Car();
  carTypes = CarTypes;
  addOrUpdate = 'Add';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private snackService: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.car.address = new Address();
    // Or we can check id via this.route.parent.snapshot.params["id"]
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.addOrUpdate = 'Update';
        this.getCar(id);
      }
    });
  }

  getCar(id: number) {
    this.dataService.getCar(id).subscribe((car: Car) => {
      this.car = car;
    });
  }

  postCar() {
    this.validateAllFormFields();
    if (!this.carForm.form.valid) {
      return;
    }
    if (this.addOrUpdate === 'Add') {
      this.addCar();
    } else {
      this.updateCar();
    }
  }

  addCar() {
    this.dataService.addCar(this.car)
      .subscribe((createdCar: Car) => {
      if (createdCar) {
        this.carForm.form.markAsPristine();
        this.snackService.open('New car has been successfully added', 
                    null, 
                    { duration: 2500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['success-message'] 
                    });
        this.router.navigate(['/cars']);
      } else {
        this.snackService.open('There was a problem adding a new car, please try again later', 
                    null, 
                    { duration: 2500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['success-message'] 
                    });
                  
        // this.growler.growl(msg, GrowlerMessageType.Danger);
        // this.errorMessage = msg;
      }
    },
      (err: any) => console.log(err));
  }

  updateCar() {
    this.dataService.updateCar(this.car).subscribe(success => {
      if (success) {
        this.carForm.form.markAsPristine();
        this.snackService.open('Changes successfully applied', 
                    null, 
                    { duration: 2500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['success-message'] 
                    });
          this.router.navigate(['/cars']);
      } else {
        this.snackService.open('There was a problem with saving changes, please try again', 
                    null, 
                    { duration: 2500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['success-message'] 
                    });
                  
      }
    });
  }

  cancel() {
    if (!this.carForm.dirty) {
      this.router.navigate(['/cars']);
      return;
    }

    // todo: pop-up/toast
    const dialogRef = this.dialog.open(PmsConfirmationDialog, {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log(confirmed);
        this.router.navigate(['/cars']);
      }
    });
  }

  validateAllFormFields() {
    Object.keys(this.carForm.controls).forEach(field => {
        const control = this.carForm.controls[field];
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
    }
  });
}

deleteCar() {
  this.dataService.deleteCar(this.car.id).subscribe(success => {
    if (success) {
      this.snackService.open('Car has been removed', 
                    null, 
                    { duration: 2500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['success-message'] 
                    });
    }
    else {
      this.snackService.open('There was a problem with removing the car, please try again', 
                    null, 
                    { duration: 2500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: ['success-message'] 
                    });
    }

    this.router.navigate(['/cars']);
  });
}
}

@Component({
  selector: 'pms-confirmation-dialog',
  template: `
  <h3 mat-dialog-title>Confirmation</h3>
  <mat-dialog-content>test</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="dialogRef.close(true)">Confirm</button>
    <button mat-button (click)="dialogRef.close(false)">Cancel</button>
  </mat-dialog-actions>
  `
})
export class PmsConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<PmsConfirmationDialog>
    ) {}
}

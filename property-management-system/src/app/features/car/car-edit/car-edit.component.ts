import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../../../shared/models/car.model';
import { CarTypes } from '../../../shared/models/types.const';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { NgForm } from '@angular/forms';
import { Address } from '../../../shared/models/address.model';

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
    private dataService: DataService) { }

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
        this.router.navigate(['/cars']);
      } else {
        const msg = 'Unable to add a new car';
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
        console.log('success');
      } else {
        console.log('error');
      }
    });
  }

  cancel() {
    if (!this.carForm.dirty) {
      this.router.navigate(['/cars']);
      return;
    }

    // todo: pop-up/toast
    window.alert('Form changed, changes will be lost');
    this.router.navigate(['/cars']);
  }
}

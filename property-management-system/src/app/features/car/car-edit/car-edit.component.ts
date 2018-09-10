import { Component, OnInit } from '@angular/core';
import { Car } from '../../../shared/models/car.model';
import { CarTypes } from '../../../shared/models/types.const';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'pms-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  car: Car = new Car();
  carTypes = CarTypes;
  addOrUpdate = 'Add';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit() {
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



}

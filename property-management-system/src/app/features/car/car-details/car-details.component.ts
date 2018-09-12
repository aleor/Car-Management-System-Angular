import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Car } from '../../../shared/models/car.model';
import { FakeDataService } from '../../../core/services/fake-data.service';

@Component({
  selector: 'pms-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  car: Car;

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private fakeDataService: FakeDataService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.getCar(id);
      }
    });
  }

  getCar(id: number) {
    this.fakeDataService.getCar(id).subscribe((car: Car) => {
      this.car = car;
    });
  }

}

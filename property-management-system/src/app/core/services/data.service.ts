import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Booking } from '../../shared/models/booking.model';
import { State } from '../../shared/models/state.model';
import { Property } from '../../shared/models/property.model';
import { PagedResults } from '../../shared/models/paged-results.model';
import { Car } from '../../shared/models/car.model';

// import { ICustomer, IOrder, IState, IPagedResults, IApiResponse } from '../../shared/interfaces';

@Injectable()
export class DataService {

    private readonly carsBaseUrl = '/api/cars';
    private readonly propertiesBaseUrl = '/api/properties';
    private readonly bookingsBaseUrl = '/api/bookings';
    orders: Booking[];
    states: State[];

    constructor(private http: HttpClient) { }

    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.carsBaseUrl)
            .pipe(
                map(car => {
                    // this.calculateCustomersOrderTotal(properties);
                    return car;
                }),
                catchError(this.handleError)
            );
    }

    takeProperties(page: number, pageSize: number): Observable<PagedResults<Property[]>> {
        return this.http.get<Property[]>(
            `${this.propertiesBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const properties = res.body as Property[];
                    this.calculateCustomersOrderTotal(properties);
                    return {
                        results: properties,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getProperties(): Observable<Property[]> {
        return this.http.get<Property[]>(this.propertiesBaseUrl)
            .pipe(
                map(properties => {
                    this.calculateCustomersOrderTotal(properties);
                    return properties;
                }),
                catchError(this.handleError)
            );
    }

    // getCustomer(id: number): Observable<ICustomer> {
    //     return this.http.get<ICustomer>(this.customersBaseUrl + '/' + id)
    //         .pipe(
    //             map(customer => {
    //                 this.calculateCustomersOrderTotal([customer]);
    //                 return customer;
    //             }),
    //             catchError(this.handleError)
    //         );
    // }

    // insertCustomer(customer: ICustomer): Observable<ICustomer> {
    //     return this.http.post<ICustomer>(this.customersBaseUrl, customer)
    //         .pipe(catchError(this.handleError));
    // }

    // updateCustomer(customer: ICustomer): Observable<boolean> {
    //     return this.http.put<IApiResponse>(this.customersBaseUrl + '/' + customer.id, customer)
    //         .pipe(
    //             map(res => res.status),
    //             catchError(this.handleError)
    //         );
    // }

    // deleteCustomer(id: number): Observable<boolean> {
    //     return this.http.delete<IApiResponse>(this.customersBaseUrl + '/' + id)
    //         .pipe(
    //             map(res => res.status),
    //             catchError(this.handleError)
    //         );
    // }

    // getStates(): Observable<IState[]> {
    //     return this.http.get<IState[]>('/api/states')
    //         .pipe(catchError(this.handleError));
    // }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }

    calculateCustomersOrderTotal(properties: Property[]) {
        for (const property of properties) {
            if (property && property.orders) {
                let total = 0;
                for (const order of property.orders) {
                    total += order.itemCost;
                }
                property.orderTotal = total;
            }
        }
    }
}

import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LoginData } from '../../shared/models/login-data.model';

@Injectable()
export class AuthService {
    private readonly authUrl = '/api/auth';

    isAuthenticated = false;
    redirectUrl: string;
    @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    private readonly demoCredentials = {
        email: 'demo@domain.com',
        password: 'demo01'
    } as LoginData;

    constructor(private http: HttpClient) { }

    private userAuthChanged(status: boolean) {
       this.authChanged.emit(status);
    }

    login(userLogin: LoginData): Observable<boolean> {
        return this.http.post<boolean>(this.authUrl + '/login', userLogin)
            .pipe(
                map(loggedIn => {
                    // demo hack
                    if (userLogin.email === this.demoCredentials.email &&
                        userLogin.password === this.demoCredentials.password) {
                            this.isAuthenticated = true;
                        } else {
                            this.isAuthenticated = false;
                        }
                    // this.isAuthenticated = loggedIn;
                    this.userAuthChanged(loggedIn);
                    return this.isAuthenticated;
                }),
                catchError(this.handleError)
            );
    }

    logout(): Observable<boolean> {
        return this.http.post<boolean>(this.authUrl + '/logout', null)
            .pipe(
                map(loggedOut => {
                    this.isAuthenticated = !loggedOut;
                    this.userAuthChanged(!loggedOut);
                    return loggedOut;
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Server error');
    }
}

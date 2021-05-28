import { User } from '../model/user.model';
import { environment as env } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

const routes = {
  login: (email: string) => `${env.baseUrl}/user/${email}`,
  bookings: (email: string, current: boolean) => `${env.baseUrl}/user/${email}/bookings?current=${current}`
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
  };

  constructor(
    private http: HttpClient) { }

  login(user: User): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers
      .set('password', user.password)
      .set('app', env.user.app)

    return this.http.put(routes.login(env.user.adminemail), null, this.httpOptions)
      .pipe(timeout(300000), catchError(this.formatErrors))
  }

  getBookings(tutenUser: any, current: boolean): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers
      .set('token', tutenUser.sessionTokenBck)
      .set('adminemail', tutenUser.email)
      .set('app', env.user.app)

    return this.http.get(routes.bookings(env.user.email, current), this.httpOptions)
      .pipe(timeout(300000), catchError(this.formatErrors))
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error);
  }

}

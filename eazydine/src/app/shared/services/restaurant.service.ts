import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Restaurant, RestaurantAdapter} from '../models/restaurant';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantbaseUrl = 'http://localhost:8080/api/restaurants/';
  // https://blog.florimondmanca.com/consuming-apis-in-angular-the-model-adapter-pattern
  constructor(
      private http: HttpClient,
      private adapter:  RestaurantAdapter,
  ) {}
  readRestaurant(restaurantId: number): Observable<Restaurant> {
    const url = `${this.restaurantbaseUrl}` + restaurantId;
    return this.http.get(url).pipe(
        map((data: any[]) => data), catchError((e: Response) => throwError(e))).pipe(
        map((item: any) => this.adapter.adapt(item)), catchError((e: Response) => throwError(e)));
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.restaurantbaseUrl}` + restaurant.id;
    console.log('Update Restaurant ' + url);
    return this.http.put<Restaurant>(url, restaurant);
  }
}

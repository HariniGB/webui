import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Restaurant, RestaurantAdapter} from '../models/restaurant';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Firebaserestaurant} from "../models/firebase/firebaserestaurant";
import {forEach} from "@angular/router/src/utils/collection";
import {Table} from "../models/table";
import {Firebasetable} from "../models/firebase/firebasetable";
import {Menu} from "../models/menu";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantbaseUrl = 'http://localhost:8080/api/restaurants/';
  private firebaseAdminsPath = '/admins';
  private firebaseRestaurantsPath = '/restaurants';
  // https://blog.florimondmanca.com/consuming-apis-in-angular-the-model-adapter-pattern
  constructor(
      private http: HttpClient,
      private adapter:  RestaurantAdapter,
      private db: AngularFireDatabase
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

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.restaurantbaseUrl}`
    console.log('Create Restaurant ' + url);
    return this.http.post<Restaurant>(url, restaurant);
  }

  createFireBaseRestaurant(restaurant : Firebaserestaurant) :Promise<any> {
    console.log(restaurant);
    restaurant.tables = {};
    //restaurant.tables = new Map<number,Firebasetable>();
    for (let i = 1; i <= restaurant.numtables; i++) {
       var table = new Firebasetable();
       table.tablenumber = i;
       table.tablestatus = 'Vacant';
      restaurant.tables[i] = table;
    }
    console.log(restaurant);
    return this.db.database.ref('/restaurants').child(restaurant.firebaseId).set(restaurant);
  }

  updateFireBaseRestaurant(restaurant : Firebaserestaurant) :Promise<any> {
    console.log(restaurant);
    if(!restaurant.tables){
      restaurant.tables = {};
    }

    let dbtablecount = Object.keys(restaurant.tables).length;

    if(restaurant.numtables > dbtablecount){
      for (let i = dbtablecount+1; i <= restaurant.numtables; i++) {
        var table = new Firebasetable();
        table.tablenumber = i;
        table.tablestatus = 'Vacant';
        restaurant.tables[i] = table;
      }
    }else{
      for (let i = restaurant.numtables+1; i <=dbtablecount ; i++) {
          delete restaurant.tables[i];
      }
    }
    console.log(restaurant);
    return this.db.database.ref('/restaurants').child(restaurant.firebaseId).set(restaurant);
  }

  readFireBaseRestaurant(firebaseId : string): AngularFireObject<any>{
    return this.db.object('/restaurants/'+firebaseId);
  }

  listFireBaseUserRestaurants(useruid : string) :AngularFireList<any[]> {
    console.log(useruid);
    return this.db.list(this.firebaseAdminsPath.concat("/", useruid))
  }

  listUserRestaurants(useruid : string) :AngularFireList<any[]> {
    console.log(useruid);
    return this.db.list(this.firebaseAdminsPath.concat("/", useruid))
  }

/*  listAllMenus(useruid : string): Observable<Restaurant[]> {
    const url = `${this.restaurantbaseUrl}`+"?uuid="+useruid ;
    console.log("RestaurantService url :"+ url)
    return this.http.get(url).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
        map((item:any[]) => {item.map(res => this.adapter.adapt(res))}), catchError((e:Response)=> throwError(e)))
  }*/

  listAllUserRestaurants(useruid : string): Observable<Restaurant[]> {
    const url = `${this.restaurantbaseUrl}`+"?uuid="+useruid ;
    console.log("RestaurantService url :"+ url)
    return this.http.get(url)
        .pipe(
            catchError((e:Response)=> throwError(e))
        )
        .map(res => {
          if(Array.isArray(res)) {
            return res.map((item) =>this.adapter.adapt(item));
          } else {
            return [this.adapter.adapt(res)];
          }
        });
  }

  deleteRestaurant(restaurantId: number): Observable<Restaurant> {
    const url = `${this.restaurantbaseUrl}` + restaurantId;
    console.log(' Delete Menu ' + url);
    return this.http.delete<Restaurant>(url);
  }

  deleteFireBaseRestaurant(firebaseId: string): Promise<any> {
    return this.db.database.ref(this.firebaseRestaurantsPath).child(firebaseId).remove()
  }

}

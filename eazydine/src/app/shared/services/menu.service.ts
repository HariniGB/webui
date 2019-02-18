import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {catchError, map} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Menu, MenuAdapter} from "../models/menu";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private baseUrl = 'http://localhost:8080/api/menus/';
    private restaurantbaseUrl = 'http://localhost:8080/api/restaurants/';

    constructor(
        private http: HttpClient,
        private adapter: MenuAdapter,
    ){}

    getMenu(id: number): Observable<Menu> {
        const url = `${this.baseUrl}`+id;
        console.log("MenuService url :"+ url);
        return this.http.get(url).pipe(
            // Adapt each item in the raw data array
           map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
               map((item:any) => this.adapter.adapt(item)), catchError((e:Response)=> throwError(e)))
    }



    /*listMenus(restaurantId: number): Observable<Menu[]> {
        const url = `${this.restaurantbaseUrl}`+restaurantId;
        console.log("RestaurantService url :"+ restaurantbaseUrl)
    }*/
}

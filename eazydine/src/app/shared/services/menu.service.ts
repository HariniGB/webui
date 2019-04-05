import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {catchError, map} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Menu, MenuAdapter} from "../models/menu";
import {Restaurant, RestaurantAdapter} from "../models/restaurant";
import {Category} from "../models/category";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private baseUrl = 'http://localhost:8080/api/menus/';
    private restaurantbaseUrl = 'http://localhost:8080/api/restaurants/';

    constructor(
        private http: HttpClient,
        private menuadapter: MenuAdapter,
        private restaurantadpater: RestaurantAdapter,
    ){}

    getMenu(id: number): Observable<Menu> {
        const url = `${this.baseUrl}`+id;
        console.log("MenuService url :"+ url);
        return this.http.get(url).pipe(
            // Adapt each item in the raw data array
           map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
               map((item:any) => this.menuadapter.adapt(item)), catchError((e:Response)=> throwError(e)))
    }



    listAllMenus(restaurantId: number): Observable<Menu[]> {
        const url = `${this.restaurantbaseUrl}`+restaurantId;
        console.log("RestaurantService url :"+ url)
        return this.http.get(url).pipe(
            // Adapt each item in the raw data array
            map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
            map((item:any) => this.restaurantadpater.adapt(item).menus), catchError((e:Response)=> throwError(e)))
    }

    createMenu(menu: Menu): Observable<Menu> {
        const url = `${this.baseUrl}`;
        console.log( 'Add Menu ' + url);
        return this.http.post<Menu>(url, menu);
    }

    deleteMenu(menuId: number): Observable<Menu> {
        const url = `${this.baseUrl}` + menuId;
        console.log(' Delete Menu ' + url);
        return this.http.delete<Menu>(url);
    }

    updateMenu(menu:Menu): Observable<Menu> {
        const url = `${this.baseUrl}` + menu.id;
        console.log('Update Menu ' + url);
        return this.http.put<Menu>(url, menu);
    }

}

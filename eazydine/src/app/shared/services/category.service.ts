import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {Menu} from "../models/menu";
import {catchError, map} from "rxjs/operators";
import {Category, CategoryAdapter} from "../models/category";
import {ItemAdapter} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private restaurantbaseUrl = 'http://localhost:8080/api/restaurants/';

  constructor(
      private http: HttpClient,
      private adapter: CategoryAdapter,
  ){}

  getCategories(restaurantId: number): Observable<Category[]> {
    const url = `${this.restaurantbaseUrl}`+restaurantId;
    console.log("CategoryService url :"+ url);
    return this.http.get(url).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
        map((item:any) => item.categories), catchError((e:Response)=> throwError(e)))
  }
}

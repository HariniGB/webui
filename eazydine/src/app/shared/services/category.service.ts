import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Category, CategoryAdapter} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/categories/';
  private restaurantbaseUrl = 'http://localhost:8080/api/restaurants/';
  //https://blog.florimondmanca.com/consuming-apis-in-angular-the-model-adapter-pattern
  constructor(
      private http: HttpClient,
      private adapter: CategoryAdapter,
  ){}

  readCategories(restaurantid:number): Observable<Category[]> {
    const url = `${this.restaurantbaseUrl}/`+restaurantid;
    return this.http.get(url).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
        map((item:any) => item.categories), catchError((e:Response)=> throwError(e)));
  }

  readCategory(categoryId : number): Observable<Category> {
    const url = `${this.baseUrl}`+categoryId;
    return this.http.get(url).pipe(
        map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
        map((item:any) => this.adapter.adapt(item)), catchError((e:Response)=> throwError(e)));
  }

  createCategory(category:Category): Observable<Category> {
    const url = `${this.baseUrl}`;
    console.log("Add Category " + url);
    return this.http.post<Category>(url, category);
  }



  deleteCategory(categoryId:number): Observable<Category> {
    const url = `${this.baseUrl}`+categoryId;
    console.log("Delete Category " + url);
    return this.http.delete<Category>(url);
  }

  updateCategory(category:Category): Observable<Category> {
    const url = `${this.baseUrl}`+category.id;
    console.log("Update Category " + url);
    return this.http.put<Category>(url,category);
  }



}

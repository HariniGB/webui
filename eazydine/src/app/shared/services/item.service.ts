import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ItemAdapter } from '../models/item' ;
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8080/api/items/';
  // https://blog.florimondmanca.com/consuming-apis-in-angular-the-model-adapter-pattern
  constructor(
      private http: HttpClient,
      private adapter: ItemAdapter,
  ){}

  readItems(): Observable<Item[]> {
    const url = `${this.baseUrl}`;
    return this.http.get(url).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => data.map(item => this.adapter.adapt(item))),
    );
  }

  readMenuItems(menuId: number): Observable<Item[]> {
    const url = `${this.baseUrl}` + '?menuId=' + menuId;
    console.log('Menu URL ::' + url);
    return this.http.get(url).pipe(
        map((data: any[]) => data), catchError((e: Response) => throwError(e))
    );

  }

  readItem(itemId : number): Observable<Item> {
    const url = `${this.baseUrl}`+itemId;
    return this.http.get(url).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => data),catchError((e:Response)=> throwError(e))).pipe(
        map((item:any) => this.adapter.adapt(item)), catchError((e:Response)=> throwError(e)));
  }



  /*public deleteUser(user) {
    return this.http.delete(this.userUrl + "/"+ user.id);
  }

  public createUser(user) {
    return this.http.post<User>(this.userUrl, user);
  }*/

  createItem(item:Item): Observable<Item> {
    const url = `${this.baseUrl}`;
    console.log("Add Menu Item " + url);
    return this.http.post<Item>(url, item);
  }



  deleteItem(itemid:number): Observable<Item> {
    const url = `${this.baseUrl}`+itemid;
    console.log("Delete Menu Item " + url);
    return this.http.delete<Item>(url);
  }

  updateItem(item:Item): Observable<Item> {
    const url = `${this.baseUrl}`+item.id;
    console.log("Update Menu Item " + url);
    return this.http.put<Item>(url,item);
  }



}

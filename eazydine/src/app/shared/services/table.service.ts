import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Table, TableAdapter} from '../models/table';
import {GlobalutilService} from "./globalutil.service";


@Injectable({
  providedIn: 'root'
})

export class TableService {

  private baseUrl = this.globalutilService.getBaseUrl() + '/api/tables/';
  private restaurantbaseUrl = this.globalutilService.getBaseUrl() + 'api/restaurants/';
  // https://blog.florimondmanca.com/consuming-apis-in-angular-the-model-adapter-pattern
  constructor(
      private http: HttpClient,
      private adapter: TableAdapter,
      private globalutilService:GlobalutilService

  ) {}

  readTables(restaurantid: number): Observable<Table[]> {
    const url = `${this.restaurantbaseUrl}/` + restaurantid;
    return this.http.get(url).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => data), catchError((e: Response) => throwError(e))).pipe(
        map((item: any) => item.tables), catchError((e: Response) => throwError(e)));
  }

  readTable(tableId: number): Observable<Table> {
    const url = `${this.baseUrl}` + tableId;
    return this.http.get(url).pipe(
        map((data: any[]) => data), catchError((e: Response) => throwError(e))).pipe(
        map((item: any) => this.adapter.adapt(item)), catchError((e: Response) => throwError(e)));
  }

  createTable(table: Table): Observable<Table> {
    const url = `${this.baseUrl}`;
    console.log('Add Table ' + url);
    return this.http.post<Table>(url, table);
  }

  deleteTable(tableId: number): Observable<Table> {
    const url = `${this.baseUrl}` + tableId;
    console.log('Delete Table ' + url);
    return this.http.delete<Table>(url);
  }

  updateTable(table: Table): Observable<Table> {
    const url = `${this.baseUrl}` + table.id;
    console.log('Update Table ' + url);
    return this.http.put<Table>(url, table);
  }



}

import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter';
import {Restaurant} from './restaurant';

export class Table {

    constructor() {
    }
    public id: number;
    public number: number;
    public description: string;
    public chairs: number;
    public restaurant: Restaurant;
}


@Injectable({providedIn: 'root'})
export class TableAdapter implements Adapter<Table> {
    adapt(item: any): Table {
        var tablemodel = new Table();
        tablemodel.id = item.id;
        tablemodel.number = item.number;
        tablemodel.description = item.description;
        tablemodel.chairs = item.chairs;
        return tablemodel;
    }
}

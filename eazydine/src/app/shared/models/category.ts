import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter';
import {Restaurant} from './restaurant';

export class Category {

    constructor() {
    }
    public id: number;
    public name: string;
    public description: string;
    public rank: number;
    public restaurant: Restaurant;

}

@Injectable({providedIn: 'root'})
export class CategoryAdapter implements Adapter<Category> {
    adapt(item: any): Category {
        var categorymodel = new Category();
        categorymodel.id = item.id;
        categorymodel.name = item.name;
        categorymodel.description = item.description;
        categorymodel.rank = item.rank;
        return categorymodel;
    }
}


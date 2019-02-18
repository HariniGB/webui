import {Injectable} from "@angular/core";
import {Adapter} from "../adapter/adapter";
import {Item} from "./item";

export class Category {

    constructor() {
    }
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public serves: number;
    public imagepath: string;
}

@Injectable({providedIn: 'root'})
export class CategoryAdapter implements Adapter<Category> {
    adapt(item: any): Category {
        var categorymodel = new Category();
        categorymodel.id = item.id;
        categorymodel.name = item.name;
        categorymodel.description = item.description;
        return categorymodel;
    }
}


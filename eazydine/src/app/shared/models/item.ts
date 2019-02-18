import {Injectable} from "@angular/core";
import {Adapter} from "../adapter/adapter";
import {Category} from "./category";
import {Menu} from "./menu";

export class Item {
    constructor() {
    }
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public serves: number;
    public imagepath: string;
    public category: Category;
    public menu: Menu;
}

@Injectable({providedIn: 'root'})
export class ItemAdapter implements Adapter<Item> {
    adapt(item: any): Item {
        let itemmodel = new Item();
        itemmodel.id = item.id;
        itemmodel.name = item.name;
        itemmodel.description = item.description;
        itemmodel.price = item.price;
        itemmodel.serves = item.serves;
        itemmodel.imagepath = item.imagepath;
        return itemmodel;
    }
}



import {Injectable} from "@angular/core";
import {Adapter} from "../adapter/adapter";
import {Item} from "./item";
import {Restaurant} from "./restaurant";


export class Menu {
    constructor(){
    }
    public id: number;
    public name: string;
    public items: Item;
    public description: string;
    public active: boolean;
    public restaurant: Restaurant;
}


@Injectable({providedIn: 'root'})
export class MenuAdapter implements Adapter<Menu> {

    adapt(item: any): Menu {
        console.log(item);
        let menumodel = new Menu();
        menumodel.id = item.id;
        menumodel.name = item.name;
        menumodel.description = item.description;
        menumodel.active = item.active;
        menumodel.items = item.items;
        return menumodel;
    }
}

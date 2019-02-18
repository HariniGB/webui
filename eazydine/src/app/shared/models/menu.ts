import {Injectable} from "@angular/core";
import {Adapter} from "../adapter/adapter";
import {Item} from "./item";


export class Menu {
    constructor(){
    }
    public id: number;
    public name: string;
    public items: Item;
}


@Injectable({providedIn: 'root'})
export class MenuAdapter implements Adapter<Menu> {

    adapt(item: any): Menu {
        let menumodel = new Menu();
        menumodel.id = item.id;
        menumodel.name = item.name;
        menumodel.items = item.items;
        return menumodel;
    }
}

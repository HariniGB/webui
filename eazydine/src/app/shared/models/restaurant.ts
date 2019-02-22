import {Injectable} from "@angular/core";
import {Adapter} from "../adapter/adapter";

export class Restaurant {
    constructor() {
    }
    public id: number;
    public name: string;
    public description: string;
}

@Injectable({providedIn: 'root'})
export class RestaurantAdapter implements Adapter<Restaurant> {
    adapt(item: any): Restaurant {
        let restaurantmodel = new Restaurant();
        restaurantmodel.id = item.id;
        restaurantmodel.name = item.name;
        restaurantmodel.description = item.description;
        return restaurantmodel;
    }
}
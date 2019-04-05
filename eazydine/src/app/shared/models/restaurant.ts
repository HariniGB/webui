import {Injectable} from '@angular/core';
import {Adapter} from '../adapter/adapter';
import {Menu} from './menu';
import {Category} from './category';
import {Table} from './table';

export class Restaurant {
    constructor() {
    }
    public id: number;
    public firebaseId : string
    public uuid : string
    public name: string;
    public tagline: string;
    public numoftables: number;
    public phonenumber: string;
    public cuisine: string;
    public menus: Menu[];
    public categories: Category;
    public tables: Table;
    public address1: string;
    public address2: string;
    public city: string;
    public state: string;
    public country: string;
    public zipcode: number;
    public allowpreorder: boolean;
    public avgprice : number;

}

@Injectable({providedIn: 'root'})
export class RestaurantAdapter implements Adapter<Restaurant> {
    adapt(item: any): Restaurant {
        let restaurantmodel = new Restaurant();
        restaurantmodel.id = item.id;
        restaurantmodel.name = item.name;
        restaurantmodel.tagline = item.tagline;
        restaurantmodel.numoftables = item.numoftables;
        restaurantmodel.cuisine = item.cuisine;
        restaurantmodel.phonenumber = item.phonenumber;
        restaurantmodel.menus = item.menus;
        restaurantmodel.categories = item.categories;
        restaurantmodel.tables = item.tables;
        restaurantmodel.address1 = item.address1;
        restaurantmodel.address2 = item.address2;
        restaurantmodel.city = item.city;
        restaurantmodel.state = item.state;
        restaurantmodel.country = item.country;
        restaurantmodel.zipcode = item.zipcode;
        restaurantmodel.firebaseId = item.firebaseId;
        restaurantmodel.uuid = item.uuid;
        restaurantmodel.allowpreorder = item.allowpreorder;
        restaurantmodel.avgprice = item.avgprice;
        return restaurantmodel;
    }
}

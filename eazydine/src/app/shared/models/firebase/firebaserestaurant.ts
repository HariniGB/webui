import {Injectable} from '@angular/core';
import {Adapter} from '../../adapter/adapter';
import {Menu} from '../menu';
import {Category} from '../category';
import {Table} from '../table';
import {Firebasetable} from "./firebasetable";

export class Firebaserestaurant {
    constructor() {
    }
    public firebaseId : string
    public name: string;
    public restaurantId : number;
    public managerid : string;
    public numtables : number;
    //public tables : Map<number,Firebasetable>;
    public tables : {};
}


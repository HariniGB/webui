import {Firebasewaitlist} from "./firebasewaitlist";

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


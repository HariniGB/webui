import {Firebaseitem} from "./firebaseitem";

export class Firebaseorder {

    public totalPrice: number;
    public orderDate: string;
    public orderId: string;
    public restaurantId: number;
    public orderTime: string;
    public orderStatus: string;
    public paid: boolean;
    public userid: string;
    public itemList : Firebaseitem[];
}
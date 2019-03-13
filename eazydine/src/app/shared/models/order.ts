import {Item} from "./item";
import {Injectable} from "@angular/core";
import {Adapter} from "../adapter/adapter";

export class Order {

    public orderId: number;
    public totalPrice: number;
    public orderDate: string;
    public orderTime: string;
    public orderStatus: string;
    public hasPaid: boolean;
    public username: string;
    public userid: string;
    public items : Item[];
}

@Injectable({providedIn: 'root'})
export class OrderAdapter implements Adapter<Order> {
    adapt(order: any): Order {
        let ordermodel = new Order();
        ordermodel.orderId = order.id;
        ordermodel.totalPrice = order.totalPrice;
        ordermodel.orderDate = order.orderDate;
        ordermodel.orderTime = order.orderTime;
        ordermodel.orderStatus = order.orderStatus;
        ordermodel.hasPaid = ordermodel.hasPaid;
        ordermodel.username = ordermodel.username;
        ordermodel.userid = ordermodel.userid;
        ordermodel.items = ordermodel.items;
        return ordermodel;
    }
}

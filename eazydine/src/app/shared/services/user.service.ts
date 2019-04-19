import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Restaurant, RestaurantAdapter} from '../models/restaurant';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Firebaserestaurant} from "../models/firebase/firebaserestaurant";
import {forEach} from "@angular/router/src/utils/collection";
import {Table} from "../models/table";
import {Firebasetable} from "../models/firebase/firebasetable";
import {Menu} from "../models/menu";
import {Firebaseuser} from "../models/firebase/firebaseuser";
import {Firebaseorder} from "../models/firebase/firebaseorder";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  private usersPath = '/users';

  readUser(userId : string) :AngularFireObject<any> {
    console.log(this.usersPath+"/"+userId);
    return this.db.object(this.usersPath+"/"+userId)
  }

  readUsersOrders(userId : string) :AngularFireList<any> {
    console.log(this.usersPath+"/"+userId+"/orders");
    return this.db.list(this.usersPath+"/"+userId+"/orders");
  }

  updateUserOrder(userId : string, status:string, firebaseOrder :Firebaseorder) :Promise<any> {
    firebaseOrder.orderStatus = status;
    console.log(this.usersPath+"/"+userId+"/orders/"+firebaseOrder.orderId);
    return this.db.database.ref(this.usersPath+"/"+userId+"/orders/"+firebaseOrder.orderId).set(firebaseOrder);
  }
}

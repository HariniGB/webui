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
import {Firebasewaitlist} from "../models/firebase/firebasewaitlist";
import {Firebaseuserstatus} from "../models/firebase/firebaseuserstatus";


@Injectable({
  providedIn: 'root'
})
export class UserstatusService {

  constructor(private db: AngularFireDatabase) { }
  private userStatusPath = '/userStatus';

  resetUserStatus(userId : string) : Promise<any>{
    let userStatus = new Firebaseuserstatus();
    //userStatus.activeRestaurantId = restaurantId;
    userStatus.status = 'OUT';
    userStatus.phoneNumber = userId;
    return this.db.database.ref(this.userStatusPath+"/"+userId).set(userStatus);
  }
}

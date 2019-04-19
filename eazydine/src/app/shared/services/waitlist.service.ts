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

@Injectable({
  providedIn: 'root'
})
export class WaitlistService {

  constructor(private db: AngularFireDatabase) { }

  private waitlistPath = '/waitlist';

  listWaitListUsers(restaurantId : number) :AngularFireList<any> {
    console.log(this.waitlistPath+"/"+restaurantId);
    return this.db.list(this.waitlistPath+"/"+restaurantId);
  }

  updateWaitListStatus(restaurantId:number,firebaseWaitList : Firebasewaitlist, firebaseTable:Firebasetable):Promise<any>{
      return this.db.object(this.waitlistPath+"/"+restaurantId+"/"+firebaseWaitList.userId).set(firebaseWaitList);
  }

  addWaitListUser(restaurantId : number, waitlistUser:Firebasewaitlist) :Promise<any> {
    console.log(this.waitlistPath+"/"+restaurantId);
    return this.db.database.ref(this.waitlistPath+"/"+restaurantId).child(waitlistUser.userId).set(waitlistUser);
  }

  clearWaitListUser(restaurantId : number, userId : string) : Promise<any>{
    return this.db.database.ref(this.waitlistPath+"/"+restaurantId+"/"+userId).remove();
  }

}

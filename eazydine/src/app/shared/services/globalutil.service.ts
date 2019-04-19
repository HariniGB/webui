import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalutilService {

  constructor( private db: AngularFireDatabase) { }

  restaurantId :string;

  setSessionRestaurantId(restaurantId : number){
    sessionStorage.setItem("restaurantId",restaurantId.toString())
  }

  getSessionRestaurantId():number{
    let restaurantId = sessionStorage.getItem("restaurantId");
    if(restaurantId){
      return(Number(restaurantId));
    }else{
      return null;
    }
  }

  getSessionRestaurantIdAsObservable():Observable<string>{
    this.restaurantId = sessionStorage.getItem("restaurantId");

    return Observable.of((this.restaurantId));

  }

  getFirebasePushKey():string{
    return this.db.createPushId();
  }

  getBaseUrl():string{
    return "http://eazydine-menu-service-lb-298016264.us-east-1.elb.amazonaws.com/";
    //return "http://localhost:8080/"
  }
}

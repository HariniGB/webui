import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Order, OrderAdapter } from '../models/order' ;
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private firebaseRestaurantsPath = 'restaurants/';
 // private firebaseTablePath = ''

 private dummyfortesturl =  'restaurantIdchipotle/tableId/transactionId2/orderId1';


  constructor(private db: AngularFireDatabase) {

  }

  readTable(restaurantId: string, tableId :string):Observable<any>{
    console.log('Hello..');
   this.db.list('/customers').valueChanges()
        .subscribe((datas) => { console.log("datas", datas) },(err)=>{ console.log("probleme : ", err) });
   return

  }

    /*  return this.db.list(this.firebaseRestaurantsPath+'/'+restaurantId+'/'+tableId).valueChanges().
         map((data: any[]) => data.map(item => this.adapter.adapt(item))),*/

    /*const tableTransactiondbref = this.db.database.ref(this.firebaseRestaurantsPath+'/'+restaurantId+'/'+tableId);
    return tableTransactiondbref.on('value', function (snapshot) {
        console.log(snapshot.val());
    });*/

  readAllTable(restaurantId: string):void{
    const restaurantTransactiondbref = this.db.database.ref(this.firebaseRestaurantsPath+'/'+restaurantId);
    restaurantTransactiondbref.on('value', function (snapshot) {
      console.log(snapshot.val());
    });
  }

    /*retrieveNotifications(restaurantId: string): Observable<Order[]> {
        return Observable.create(subscriber => {
            const ref = this.db.database.ref(this.firebaseRestaurantsPath+'/'+restaurantId);
            const callback = ref.on('value', snap => {
                const data = snap.val();
                const notifications = Object.keys(data).map(key => {
                    return new NotificationObj(key, data[key]);
                });
                subscriber.next(notifications);
            });
            return () => ref.off('value', callback);
        })
    }*/
}

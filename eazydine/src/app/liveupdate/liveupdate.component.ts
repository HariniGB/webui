import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {ItemService} from "../shared/services/item.service";
import {CategoryService} from "../shared/services/category.service";
import {OrderService} from "../shared/services/order.service";
import {GlobalutilService} from "../shared/services/globalutil.service";
import {UserService} from "../shared/services/user.service";
import {RestaurantService} from "../shared/services/restaurant.service";
import {WaitlistService} from "../shared/services/waitlist.service";
import {Observable,combineLatest} from "rxjs";
import {Firebasetable} from "../shared/models/firebase/firebasetable";
import {Firebasewaitlist} from "../shared/models/firebase/firebasewaitlist";
import {Firebaseorder} from "../shared/models/firebase/firebaseorder";
import {UserstatusService} from "../shared/services/userstatus.service";

@Component({
  selector: 'app-liveupdate',
  templateUrl: './liveupdate.component.html',
  styleUrls: ['./liveupdate.component.css']
})
export class LiveupdateComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router, private globalutilService: GlobalutilService, private userService: UserService, private restaurantService: RestaurantService, private waitlistService: WaitlistService, private userStatusSerivce : UserstatusService){}
  restaurantId : number;
  tables$:Observable<Firebasetable[]>
  firebaseTable:Firebasetable;
  selectedUser: Firebasewaitlist;
  firebaseRestId : string;
  newWaitlistUser : Firebasewaitlist;
  userOrders$ : Observable<Firebaseorder[]>;
  selectedUserOrders$ : Observable<Firebaseorder[]>;
  selectedTable : Firebasetable;

  ngOnInit() {
    this.restaurantId = this.globalutilService.getSessionRestaurantId();
    this.restaurantService.readRestaurant(this.restaurantId)
        .subscribe(rest => {
          this.firebaseRestId = rest.firebaseId;
          this.tables$ = this.restaurantService.readFireBaseRestaurantTables(rest.firebaseId).valueChanges();
        });
  }

   /* this.tables$  = this.orderService.readTable('restaurantIdchipotle','tableId');
    this.table$.valueChanges().subscribe((datas) => { console.log("datas", datas)});*/
    //this.db.list('/customers').valueChanges().subscribe((datas) => { console.log("datas", datas) },(err)=>{ console.log("probleme : ", err) });

  selectTable(table : Firebasetable){
    this.selectedTable = table;
    this.selectedUserOrders$ = this.userService.readUsersOrders(table.userid).valueChanges();
  }

  updateOrderStatus(order : Firebaseorder){
    this.userService.updateUserOrder(this.selectedTable.userid, order.orderStatus, order);
  }

  clearTable(){
    console.log(this.selectedTable);
    this.restaurantService.clearRestaurantTable(this.firebaseRestId,this.selectedTable)
        .then (data => this.waitlistService.clearWaitListUser(this.restaurantId,this.selectedTable.userid)
            .then(data => this.userStatusSerivce.resetUserStatus(this.selectedTable.userid)));
  }

/*  updateAllOrderStatus(status : string){
    this.selectedUserOrders$.subscribe(orders => {
      for(let order of orders){
        this.userService.updateUserOrder(this.selectedTable.userid,status, order);
      }
      return;
    });
  }*/



  getUserOrderTotalPayable(): Observable<number> {
    return this.selectedUserOrders$
        .map(orders => {
          return this.getTotal(orders);
        });
  }

  getTotal(orders):number{
    let total =0;
    for(let order of orders) {
      if(order.orderStatus!='Cart'){
        total += order.totalPrice;
      }
    }
    return total;
  }

}

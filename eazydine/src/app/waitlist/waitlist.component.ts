import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalutilService} from "../shared/services/globalutil.service";
import {RestaurantService} from "../shared/services/restaurant.service";
import {Observable} from "rxjs";
import {Restaurant} from "../shared/models/restaurant";
import {WaitlistService} from "../shared/services/waitlist.service";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Firebasewaitlist} from "../shared/models/firebase/firebasewaitlist";
import {UserService} from "../shared/services/user.service";
import {Firebaseuser} from "../shared/models/firebase/firebaseuser";
import {map} from "rxjs/operators";
import {mergeMap} from "rxjs-compat/operator/mergeMap";
import {Firebasetable} from "../shared/models/firebase/firebasetable";
import {Firebaseorder} from "../shared/models/firebase/firebaseorder";


@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.css']
})
export class WaitlistComponent implements OnInit {

  constructor(private router: Router, private globalutilService: GlobalutilService, private userService: UserService, private restaurantService: RestaurantService, private waitlistService: WaitlistService ) { }
  restaurantId : number;
  waitlist$:Observable<Firebasewaitlist[]>;
  tables$:Observable<Firebasetable[]>
  firebaseTable:Firebasetable;
  selectedUser: Firebasewaitlist;
  firebaseRestId : string;
  newWaitlistUser : Firebasewaitlist;
  userOrders$ : Observable<Firebaseorder[]>;


//https://stackoverflow.com/questions/42349131/angularfire2-perform-joins-on-firebaselistobservables-using-rxjs-map
  ngOnInit() {
    this.restaurantId = this.globalutilService.getSessionRestaurantId();
    this.waitlist$ = this.waitlistService.listWaitListUsers(this.restaurantId).valueChanges();
    this.newWaitlistUser = new Firebasewaitlist();
    this.restaurantService.readRestaurant(this.restaurantId)
        .subscribe(rest => {
          this.firebaseRestId = rest.firebaseId;
          this.tables$ = this.restaurantService.readFireBaseRestaurantTables(rest.firebaseId).valueChanges();

        });
  }

  selectUserId(selectedUser : Firebasewaitlist){
    this.selectedUser =  selectedUser;
  }

  assignTable(){
    console.log('Table :' + this.firebaseTable.tablenumber);
    console.log('Selected User :' + this.selectedUser);
    console.log('Restaurant :' + this.restaurantId);
    this.selectedUser.status = 'Assigned';
    this.selectedUser.tablenumber = this.firebaseTable.tablenumber;

    this.firebaseTable.userid = this.selectedUser.userId;
    this.firebaseTable.tablestatus = 'Occupied';

    this.userOrders$ = this.userService.readUsersOrders(this.selectedUser.userId).valueChanges();

    this.restaurantService.updateRestaurantTable(this.firebaseRestId, this.firebaseTable)
        .then(data => this.waitlistService.updateWaitListStatus(this.restaurantId, this.selectedUser,this.firebaseTable)
            .then(data => {
              console.log("Updated Waitlist");
              this.userOrders$.subscribe(orders => {
                for(let order of orders){
                  if(order.orderStatus == "PreOrder" && order.restaurantId == this.restaurantId){
                    this.userService.updateUserOrder(this.selectedUser.userId, "Placed", order);
                  }
                }
                console.log("Updated Orders");
              });
            }));
  }

  addWaitListUser(){
    console.log(this.newWaitlistUser);
    this.newWaitlistUser.status ="Waiting";
    this.newWaitlistUser.restaurantId = String(this.restaurantId);
    this.waitlistService.addWaitListUser(this.restaurantId, this.newWaitlistUser).then(data => console.log("User added successfully"));
    this.newWaitlistUser = new Firebasewaitlist();
  }


}
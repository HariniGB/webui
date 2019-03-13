import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {ItemService} from "../shared/services/item.service";
import {CategoryService} from "../shared/services/category.service";
import {OrderService} from "../shared/services/order.service";

@Component({
  selector: 'app-liveupdate',
  templateUrl: './liveupdate.component.html',
  styleUrls: ['./liveupdate.component.css']
})
export class LiveupdateComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router, private orderService: OrderService){}
  table$: AngularFireList<any[]>;
  ngOnInit() {
    //this.table$  = this.orderService.readTable('restaurantIdchipotle','tableId');
    //this.table$.valueChanges().subscribe((datas) => { console.log("datas", datas)});
    //this.db.list('/customers').valueChanges().subscribe((datas) => { console.log("datas", datas) },(err)=>{ console.log("probleme : ", err) });
  }

}

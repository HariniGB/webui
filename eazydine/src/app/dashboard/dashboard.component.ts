import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../shared/services/restaurant.service";
import {GlobalutilService} from "../shared/services/globalutil.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  restaurantId : number;

  constructor(private globalutilService: GlobalutilService) { }

  ngOnInit() {
    this.restaurantId = this.globalutilService.getSessionRestaurantId();
    console.log(this.restaurantId);
  }

}

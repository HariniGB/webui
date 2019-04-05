import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Restaurant} from '../../shared/models/restaurant';
import {RestaurantService} from '../../shared/services/restaurant.service';
import {GlobalutilService} from "../../shared/services/globalutil.service";

@Component({
  selector: 'app-listrestaurant',
  templateUrl: './displayrestaurant.component.html',
  styleUrls: ['./displayrestaurant.component.css']
})
export class DisplayrestaurantComponent implements OnInit {

  restaurant$: Observable<Restaurant>;
  constructor(private router: Router,private globalutilService: GlobalutilService, private restaurantService: RestaurantService) {
  }

  displayRestaurant(): void {
    this.restaurant$ =  this.restaurantService.readRestaurant(this.globalutilService.getSessionRestaurantId());
  }

  ngOnInit() {
    this.displayRestaurant();
  }
}

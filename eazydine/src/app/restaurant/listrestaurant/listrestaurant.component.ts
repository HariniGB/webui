import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Restaurant} from '../../shared/models/restaurant';
import {RestaurantService} from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-listrestaurant',
  templateUrl: './listrestaurant.component.html',
  styleUrls: ['./listrestaurant.component.css']
})
export class ListrestaurantComponent implements OnInit {

  restaurant$: Observable<Restaurant>;
  constructor(private router: Router, private restaurantService: RestaurantService) {
  }

  listRestaurant(): void {
    this.restaurant$ =  this.restaurantService.readRestaurant(1);
  }

  ngOnInit() {
    this.listRestaurant();
  }
}

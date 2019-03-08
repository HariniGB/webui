import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../../shared/models/restaurant';
import {RestaurantService} from '../../shared/services/restaurant.service';

@Component({
  selector: 'app-editrestaurant',
  templateUrl: './editrestaurant.component.html',
  styleUrls: ['./editrestaurant.component.css']
})
export class EditrestaurantComponent implements OnInit {

  restaurant$: Observable<Restaurant>;
  restaurantId: number;

  constructor(private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = + params.get('id');
      console.log('restaurantId :' + this.restaurantId);
      this.restaurant$ = this.restaurantService.readRestaurant(this.restaurantId);
    });
  }
  updateRestaurant(udpatedRestaurant: Restaurant): void {
    console.log(udpatedRestaurant);
    this.restaurantService.updateRestaurant(udpatedRestaurant)
        .subscribe( data => {
          alert('Restaurant updated successfully.');
          this.router.navigate(['/restaurant']);
        });
  }
}

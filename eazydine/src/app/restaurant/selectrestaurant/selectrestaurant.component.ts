import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Restaurant} from '../../shared/models/restaurant';
import {RestaurantService} from '../../shared/services/restaurant.service';
import {AuthService} from "../../shared/security/auth.service";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {GlobalutilService} from "../../shared/services/globalutil.service";


@Component({
  selector: 'app-selectrestaurant',
  templateUrl: './selectrestaurant.component.html',
  styleUrls: ['./selectrestaurant.component.css']
})
export class SelectrestaurantComponent implements OnInit {

  restaurant$: Observable<Restaurant[]>;
  uuid:string
  constructor(private router: Router, private globalutilService: GlobalutilService, private restaurantService: RestaurantService, private authService: AuthService ){
  }

  listRestaurant(): void {
    this.restaurant$ =  this.restaurantService.listAllUserRestaurants(this.uuid);
  }

  ngOnInit() {
    this.authService.getUserUid().subscribe(data => {
      this.uuid = data;
      this.listRestaurant();
    });
  }

  selectRestaurant(restaurantId:number): void {
    this.globalutilService.setSessionRestaurantId(restaurantId);
    this.router.navigate(['/dashboard'])
  }

  deleteRestaurant(restaurantId: number, firebaseId:string): void {
    this.restaurantService.deleteFireBaseRestaurant(firebaseId)
        .then(data => {
          this.restaurantService.deleteRestaurant(restaurantId).subscribe(data => {
            alert('Restaurant deleted successfully.');
            this.listRestaurant();
          })
        });
  }


}

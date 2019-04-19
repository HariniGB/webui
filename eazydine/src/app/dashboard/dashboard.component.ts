import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../shared/services/restaurant.service";
import {GlobalutilService} from "../shared/services/globalutil.service";
import {UserService} from "../shared/services/user.service";
import {Observable} from "rxjs";
import {Restaurant} from "../shared/models/restaurant";
import {CategoryService} from "../shared/services/category.service";
import {Category} from "../shared/models/category";
import {AuthService} from "../shared/security/auth.service";
import {WaitlistService} from "../shared/services/waitlist.service";
import {Firebasewaitlist} from "../shared/models/firebase/firebasewaitlist";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  restaurantId : number;
  restaurant$ : Observable<Restaurant>;
  alluserrestaurants$ : Observable<Restaurant[]>;
  categories$ : Observable<Category[]>;
  uuid:string;
  waitlist$:Observable<Firebasewaitlist[]>;

  constructor(private globalutilService: GlobalutilService, private authService: AuthService, private categoryService: CategoryService, private restaurantService: RestaurantService, private waitlistService: WaitlistService) { }

  ngOnInit() {
    this.restaurantId = this.globalutilService.getSessionRestaurantId();
    this.authService.getUserUid().subscribe(data => {
      this.uuid = data;
      this.alluserrestaurants$ =  this.restaurantService.listAllUserRestaurants(this.uuid);
    });
    this.restaurant$ = this.restaurantService.readRestaurant(this.restaurantId);
    this.categories$ =  this.categoryService.readCategories(this.restaurantId);
    this.waitlist$ = this.waitlistService.listWaitListUsers(this.restaurantId)
        .valueChanges().map(waitlists => waitlists.filter(waitlist => waitlist.status=='Waiting'));
  }

}

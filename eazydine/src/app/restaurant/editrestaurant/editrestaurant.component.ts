import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../../shared/models/restaurant';
import {RestaurantService} from '../../shared/services/restaurant.service';
import {AuthService} from "../../shared/security/auth.service";
import {GlobalutilService} from "../../shared/services/globalutil.service";
import {Firebaserestaurant} from "../../shared/models/firebase/firebaserestaurant";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';


@Component({
  selector: 'app-editrestaurant',
  templateUrl: './editrestaurant.component.html',
  styleUrls: ['./editrestaurant.component.css']
})
export class EditrestaurantComponent implements OnInit {

  restaurant$: Observable<Restaurant>;
  restaurantId: number;

  uuid: string;
  firebaseRestaurantId : string;
  firebaserestaurant: Firebaserestaurant;
  createdRestaurant$ : Observable<Restaurant>;
  readFirebaseRestaurant$ : AngularFireObject<any>;

  constructor(private route: ActivatedRoute,private router: Router, private globalUtilService: GlobalutilService, private restaurantService: RestaurantService,private authService :AuthService) { }

  ngOnInit() {
    this.authService.getUserUid().subscribe(uuid => {
      this.uuid = uuid
    });
    this.route.paramMap.subscribe(params => {
      this.restaurantId = + params.get('id');
      console.log('restaurantId :' + this.restaurantId);
      this.restaurant$ = this.restaurantService.readRestaurant(this.restaurantId);
      this.restaurant$.subscribe(updaterest =>{
        console.log(updaterest.firebaseId);
        if(updaterest.firebaseId){
          this.readFirebaseRestaurant$ = this.restaurantService.readFireBaseRestaurant(updaterest.firebaseId);
          this.readFirebaseRestaurant$.valueChanges().subscribe(data => {
            this.firebaserestaurant = data;
            console.log("Read Firebase Restaurant" );
            console.log(this.firebaserestaurant);
          });
        }
      });
    });
  }




  updateRestaurant(updatedRestaurant: Restaurant): void {

    updatedRestaurant.uuid = this.uuid;
    console.log(updatedRestaurant);
    let isThereAFirebaseRest = true;
    if(updatedRestaurant.firebaseId){
      this.firebaseRestaurantId = updatedRestaurant.firebaseId
    }else{
      this.firebaserestaurant = new Firebaserestaurant();
      this.firebaseRestaurantId = this.globalUtilService.getFirebasePushKey();
      updatedRestaurant.firebaseId = this.firebaseRestaurantId;
      isThereAFirebaseRest = false;
    }

    this.firebaserestaurant.firebaseId = this.firebaseRestaurantId;
    this.firebaserestaurant.name = updatedRestaurant.name;
    this.firebaserestaurant.managerid = updatedRestaurant.uuid;
    this.firebaserestaurant.restaurantId = updatedRestaurant.id;
    this.firebaserestaurant.numtables = updatedRestaurant.numoftables;

    this.restaurantService.updateRestaurant(updatedRestaurant)
        .subscribe( data => {
          if(isThereAFirebaseRest){
            this.restaurantService.updateFireBaseRestaurant(this.firebaserestaurant).then(
                data => {
                  this.router.navigate(['/displayrestaurant']);
                }).catch(err => alert("Restaurant not updated due to "+ err));
          }else{
            this.restaurantService.createFireBaseRestaurant(this.firebaserestaurant).then(
                data => {
                  this.router.navigate(['/displayrestaurant']);
                }).catch(err => alert("Restaurant not created due to "+ err));
          }
          alert('Restaurant updated successfully.');
          this.router.navigate(['/displayrestaurant']);

        });
  }

  log(event) { console.log(event.target.checked); }


}

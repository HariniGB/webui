import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TableService} from "../../shared/services/table.service";
import {Table} from "../../shared/models/table";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {Restaurant} from "../../shared/models/restaurant";
import {GlobalutilService} from "../../shared/services/globalutil.service";
import {Firebaserestaurant} from "../../shared/models/firebase/firebaserestaurant";
import {AuthService} from "../../shared/security/auth.service";
import {Observable} from "rxjs";
import {FileUpload} from "../../shared/models/fileupload";
import {FileUploadService} from "../../shared/services/fileupload.service";

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.component.html',
  styleUrls: ['./addrestaurant.component.css']
})
export class AddrestaurantComponent implements OnInit {

  constructor(private router: Router, private globalUtilService: GlobalutilService, private authService: AuthService, private restaurantService: RestaurantService,private fileUploadService: FileUploadService) { }
  restaurant: Restaurant = new Restaurant();
  firebaserestaurant: Firebaserestaurant = new Firebaserestaurant();
  firebaseRestaurantId : string;
  uuid : string;
  createdRestaurant$ : Observable<Restaurant>;
  selectedFiles: FileList;
  currentUpload: FileUpload;
  imgURL: any;
  imagePath: any;

  ngOnInit() {
    this.authService.getUserUid().subscribe(data => {
      this.uuid = data;
    });
  }

  createAllRestDetails() : void{
    if(this.selectedFiles) {
      this.upload().subscribe(downloadURL => {
        this.restaurant.restaurantbgimage = downloadURL;
        this.createRestaurant();
      })
    }else {
      this.createRestaurant();
    }
  }

  createRestaurant(): void {

    this.firebaseRestaurantId = this.globalUtilService.getFirebasePushKey();

    this.restaurant.firebaseId = this.firebaseRestaurantId;
    this.restaurant.uuid = this.uuid;

    this.firebaserestaurant.firebaseId = this.firebaseRestaurantId;
    this.firebaserestaurant.managerid = this.uuid;
    this.firebaserestaurant.name = this.restaurant.name;
    this.firebaserestaurant.numtables = this.restaurant.numoftables;
    this.firebaserestaurant.managerid = this.uuid;

    this.createdRestaurant$ = this.restaurantService.createRestaurant(this.restaurant);

    this.createdRestaurant$.subscribe(createdrestaurant => {
      console.log(createdrestaurant);
      this.firebaserestaurant.restaurantId = createdrestaurant.id;
      this.restaurantService.createFireBaseRestaurant(this.firebaserestaurant).then(
          data => {
            this.globalUtilService.setSessionRestaurantId(createdrestaurant.id);
            this.router.navigate(['/dashboard']);
          }).catch(err => alert("Restaurant not created due to "+ err));
      });

    /*this.restaurantService.createRestaurant(this.restaurant)
        .subscribe( data => {
          alert('Restaurant created successfully.');
          this.router.navigate(['/restaurants']);
        });*/
    }

  detectFiles(event) {
    this.selectedFiles = event.target.files;

    var reader = new FileReader();
    this.imagePath = this.selectedFiles.item(0);
    reader.readAsDataURL(this.selectedFiles.item(0));
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  upload() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new FileUpload(file);
    this.currentUpload.name = this.currentUpload.file.name;
    return this.fileUploadService.pushRestBgImageUpload(this.currentUpload);
  }
  log(event) { console.log(event.target.checked); }
}

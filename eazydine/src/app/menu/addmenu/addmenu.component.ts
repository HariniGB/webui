import { Component, OnInit } from '@angular/core';
import {Item} from "../../shared/models/item";
import {Router} from "@angular/router";
import {ItemService} from "../../shared/services/item.service";
import {Category} from "../../shared/models/category";
import {Menu} from "../../shared/models/menu";
import {CategoryService} from "../../shared/services/category.service";
import {Restaurant} from "../../shared/models/restaurant";
import {MenuService} from "../../shared/services/menu.service";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {GlobalutilService} from "../../shared/services/globalutil.service";


@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {

  ngOnInit() {
    this.restaurantId = this.globalutilService.getSessionRestaurantId();
  }

  constructor(private router: Router,private globalutilService: GlobalutilService,private menuService: MenuService) { }
  menu: Menu = new Menu();
  restaurantId: number;


  createMenu(): void {
    console.log(this.menu);
    var menuRestaurant = new Restaurant();
    menuRestaurant.id =  this.restaurantId;
    this.menu.restaurant =menuRestaurant;
    this.menuService.createMenu(this.menu)
        .subscribe( data => {
          alert("Menu created successfully.");
          this.router.navigate(['/menu']);
        });
  };
  log(event) { console.log(event.target.checked); }

}

import { Component, OnInit } from '@angular/core';
import {Menu} from "../../shared/models/menu";
import {Router} from "@angular/router";
import {ItemService} from "../../shared/services/item.service";
import {CategoryService} from "../../shared/services/category.service";
import {Item} from "../../shared/models/item";
import {Observable} from "rxjs";
import {Category} from "../../shared/models/category";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {Restaurant} from "../../shared/models/restaurant";

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  constructor(private router: Router,private categoryService: CategoryService) { }
  category: Category = new Category();
  ngOnInit() {
  }

  createCategory(): void {
    console.log(this.category);
    var categoryRestaurant = new Restaurant();
    categoryRestaurant.id = 1;
    this.category.restaurant =categoryRestaurant;
    this.categoryService.createCategory(this.category)
        .subscribe( data => {
          alert("Category created successfully.");
          this.router.navigate(['/category']);
        });
  };

}

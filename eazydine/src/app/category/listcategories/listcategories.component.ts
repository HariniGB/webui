import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Category} from '../../shared/models/category';
import {CategoryService} from '../../shared/services/category.service';
import {RestaurantService} from "../../shared/services/restaurant.service";
import {GlobalutilService} from "../../shared/services/globalutil.service";

@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  restaurantId : number;
  searchText: string;
  constructor(private router: Router, private globalutilService: GlobalutilService, private categoryService: CategoryService ){
  }

  listCategories(): void {
    this.categories$ =  this.categoryService.readCategories(this.restaurantId);
  }

  ngOnInit() {
    this.restaurantId = this.globalutilService.getSessionRestaurantId();
    this.listCategories();
  }

  deleteCategory(categoryId: number): boolean {
    this.categoryService.deleteCategory(categoryId)
        .subscribe(data => {
          alert('Category deleted successfully.');
          this.listCategories();
        });
    return false;
  }
}

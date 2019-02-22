import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Category} from "../../shared/models/category";
import {CategoryService} from "../../shared/services/category.service";

@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent implements OnInit {
  categories$:Observable<Category[]>;
  searchText:string;
  constructor(private router: Router,private categoryService: CategoryService){
  }

  listCategories():void{
    this.categories$ =  this.categoryService.readCategories(1);
  }

  ngOnInit() {
    this.listCategories();
  }

  deleteCategory(categoryId:number): boolean {
    this.categoryService.deleteCategory(categoryId)
        .subscribe(data => {
          alert("Category deleted successfully.");
          this.listCategories();
        });
    return false;
  };

}

import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/models/category';
import {Restaurant} from '../../shared/models/restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  category$: Observable<Category>;
  categoryId: number;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('id');
      console.log('categoryId :' + this.categoryId);
      this.category$ = this.categoryService.readCategory(this.categoryId);
    });
  }
  updateCategory(udpatedCategory: Category): void {
    let categoryRestaurant = new Restaurant();
    categoryRestaurant.id = 1;
    udpatedCategory.restaurant = categoryRestaurant;
    console.log(udpatedCategory);
    this.categoryService.updateCategory(udpatedCategory)
        .subscribe( data => {
          alert('Category updated successfully.');
          this.router.navigate(['/category']);
        });
  }
}

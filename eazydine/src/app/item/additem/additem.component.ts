import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/models/category";
import {Menu} from "../../shared/models/menu";
import {Item} from "../../shared/models/item";
import {Router} from "@angular/router";
import {ItemService} from "../../shared/services/item.service";
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  constructor(private router: Router, private itemService: ItemService, private categoryService: CategoryService) { }
  item: Item = new Item();
  categories$ : Observable<Category[]>;
  ngOnInit() {
   this.categories$ =  this.categoryService.readCategories(1);
    this.categories$.subscribe( data => console.log(data));
  }

  createItem(): void {
    console.log(this.item);
    var itemMenu = new Menu();
    itemMenu.id = 2;
    this.item.menu =itemMenu;
    this.itemService.createItem(this.item)
        .subscribe( data => {
          alert("Menu Item created successfully.");
          this.router.navigate(['/menu']);
        });
  };
}

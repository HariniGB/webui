import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/models/category";
import {Observable} from "rxjs";
import {Item} from "../../shared/models/item";
import {Menu} from "../../shared/models/menu";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../shared/services/item.service";
import {CategoryService} from "../../shared/services/category.service";

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {

  item$:Observable<Item>;
  itemid:number;
  categories$ : Observable<Category[]>;


  constructor(private route:ActivatedRoute, private router: Router, private itemService: ItemService, private categoryService: CategoryService) { }

  ngOnInit() {
    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.itemid = +params.get("id");
      console.log("itemid"+ this.itemid);
      this.item$ = this.itemService.readItem(this.itemid);
    });
    this.categories$ =  this.categoryService.getCategories(1);
    this.categories$.subscribe( data => console.log(data));

  }

  updateItem(updateditem:Item): void {
    let itemMenu = new Menu();
    itemMenu.id = 2;
    updateditem.menu =itemMenu;
    console.log(updateditem);
    this.itemService.updateItem(updateditem)
         .subscribe( data => {
           alert("Menu Item updated successfully.");
           this.router.navigate(['/menu']);
         });
  };
}

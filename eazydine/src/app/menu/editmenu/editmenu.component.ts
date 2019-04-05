import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Menu} from "../../shared/models/menu";
import {Item} from "../../shared/models/item";
import {Category} from "../../shared/models/category";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../shared/services/category.service";
import {Restaurant} from "../../shared/models/restaurant";
import {MenuService} from "../../shared/services/menu.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RestaurantService} from "../../shared/services/restaurant.service";
import {GlobalutilService} from "../../shared/services/globalutil.service";


@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.css']
})
export class EditmenuComponent implements OnInit {

  menu$:Observable<Menu>;

  menuId: number;

  constructor(private route: ActivatedRoute,private globalutilService: GlobalutilService, private router: Router, private menuService: MenuService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.menuId = +params.get('id');
      console.log('menuId :' + this.menuId);
      this.menu$ = this.menuService.getMenu(this.menuId);
      this.menu$.subscribe(data => console.log(data))
    });
  }
  updateMenu(updatedMenu: Menu): void {
    let menuRestaurant = new Restaurant();
    menuRestaurant.id = this.globalutilService.getSessionRestaurantId();
    updatedMenu.restaurant = menuRestaurant;
    console.log(updatedMenu);
    this.menuService.updateMenu(updatedMenu)
        .subscribe( data => {
          alert('Menu updated successfully.');
          this.router.navigate(['/menu',]);
        });
  }

  log(event) { console.log(event.target.checked); }


}

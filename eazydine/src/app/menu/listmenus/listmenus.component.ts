import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Menu} from "../../shared/models/menu";
import {MenuService} from "../../shared/services/menu.service";
import {RestaurantService} from "../../shared/services/restaurant.service";
import {GlobalutilService} from "../../shared/services/globalutil.service";

@Component({
  selector: 'app-listmenus',
  templateUrl: './listmenus.component.html',
  styleUrls: ['./listmenus.component.css']
})
export class ListmenusComponent implements OnInit {

  menus$: Observable<Menu[]>;
  restaurantId: number;
  constructor(private router: Router,private globalutilService: GlobalutilService, private menuService: MenuService){
  }

  listMenus(): void {
    this.restaurantId = this.globalutilService.getSessionRestaurantId();
    this.menus$ =  this.menuService.listAllMenus(this.restaurantId);
  }

  ngOnInit() {
    this.listMenus();
  }

  deleteMenu(menuId: number): boolean {
    this.menuService.deleteMenu(menuId)
        .subscribe(data => {
          alert('Menu deleted successfully.');
          this.listMenus();
        });
    return false;
  }

}

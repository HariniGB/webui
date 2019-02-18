import {Component, Inject, OnInit} from '@angular/core';
import {MenuService} from "../../shared/services/menu.service";
import {Observable} from "rxjs";
import {Menu} from "../../shared/models/menu";
import {Router} from "@angular/router";
import {ItemService} from "../../shared/services/item.service";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-menu',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css'],
  providers: [MenuService]
})
export class MenuItemListComponent implements OnInit {
    menu$:Observable<Menu>;
    searchText:string;
    constructor(private router: Router,private menuService: MenuService, private itemService:ItemService){
    }

    ngOnInit() {
        this.listItems();
    }

    deleteItem(itemid:number): boolean {
    this.itemService.deleteItem(itemid)
        .subscribe(data => {
            alert("Menu Item deleted successfully.");
            this.listItems();
        });
        return false;
    };

    listItems():void{
        this.menu$ = this.menuService.getMenu(2);
    }

   /* searchListItems(searchText:string):void{
        this.menu$.pipe(
            filter(data => data.items.category==='')
        )
    }*/

}

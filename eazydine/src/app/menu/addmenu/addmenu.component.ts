import { Component, OnInit } from '@angular/core';
import {Item} from "../../shared/models/item";
import {Router} from "@angular/router";
import {ItemService} from "../../shared/services/item.service";
import {Category} from "../../shared/models/category";
import {Menu} from "../../shared/models/menu";


@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {



  ngOnInit() {

  }

  constructor(private router: Router, private itemService: ItemService) {

  }






}

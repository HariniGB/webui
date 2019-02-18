import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Menu} from "../../shared/models/menu";
import {Item} from "../../shared/models/item";

@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.css']
})
export class EditmenuComponent implements OnInit {

  item$:Observable<Item>;

  constructor() { }

  ngOnInit() {

    //this.item$ = this.itemService.readItem(2);
  }

}

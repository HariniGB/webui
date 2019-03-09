import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category';
import {Restaurant} from '../../shared/models/restaurant';
import {Table} from '../../shared/models/table';
import {TableService} from '../../shared/services/table.service';

@Component({
  selector: 'app-addtable',
  templateUrl: './addtable.component.html',
  styleUrls: ['./addtable.component.css']
})
export class AddtableComponent implements OnInit {


  constructor(private router: Router, private tableService: TableService) { }
  table: Table = new Table();
  ngOnInit() {
  }

  createTable(): void {
    console.log(this.table);
    var tableRestaurant = new Restaurant();
    tableRestaurant.id = 1;
    this.table.restaurant = tableRestaurant;
    this.tableService.createTable(this.table)
        .subscribe( data => {
          alert('Table created successfully.');
          this.router.navigate(['/table']);
        });
  };


}

import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Table} from '../../shared/models/table';
import {TableService} from '../../shared/services/table.service';

@Component({
  selector: 'app-listtables',
  templateUrl: './listtables.component.html',
  styleUrls: ['./listtables.component.css']
})
export class ListtablesComponent implements OnInit {

  tables$: Observable<Table[]>;
  searchText: string;
  constructor(private router: Router, private tableService: TableService){
  }

  listTables(): void{
    this.tables$ =  this.tableService.readTables(1);
  }

  ngOnInit() {
    this.listTables();
  }

  deleteTable(tableId: number): boolean {
    this.tableService.deleteTable(tableId)
        .subscribe(data => {
          alert('Table deleted successfully.');
          this.listTables();
        });
    return false;
  };


}

import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../../shared/models/restaurant';
import {Table} from '../../shared/models/table';
import {TableService} from '../../shared/services/table.service';

@Component({
  selector: 'app-edittable',
  templateUrl: './edittable.component.html',
  styleUrls: ['./edittable.component.css']
})
export class EdittableComponent implements OnInit {

  table$: Observable<Table>;
  tableId: number;

  constructor(private route: ActivatedRoute, private router: Router, private tableService: TableService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tableId = +params.get('id');
      console.log('tableId :' + this.tableId);
      this.table$ = this.tableService.readTable(this.tableId);
    });
  }
  updateTable(udpatedTable: Table): void {
    let tableRestaurant = new Restaurant();
    tableRestaurant.id = 1;
    udpatedTable.restaurant = tableRestaurant;
    console.log(udpatedTable);
    this.tableService.updateTable(udpatedTable)
        .subscribe( data => {
          alert('Table updated successfully.');
          this.router.navigate(['/table']);
        });
  };


}

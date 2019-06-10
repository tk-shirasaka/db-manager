import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConnectionService } from '../connection.service';
import { Connection } from '../connection';
import { TableService } from '../table.service';
import { Column } from '../table';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  connection: Connection;
  table: string;
  columns: Column[] = [];
  selected: Column[] = [];
  filter: string;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    const connection = +this.route.snapshot.paramMap.get('connection');
    const table = this.route.snapshot.paramMap.get('table');

    this.connectionService.setConnection(connection).getConnection()
      .subscribe(connection => this.connection = connection);
    this.tableService.setConnection(connection).setTable(table).getColumns()
      .subscribe(columns => this.columns = columns);
    this.table = table;
  }

  checkColumn(column: Column) {
    return this.tableService.checkColumn(column);
  }

  toggleColumn(column: Column) {
    this.selected = this.tableService.toggleColumn(column);
  }

  toggleColumns() {
    this.columns.map(column => column.name.search(this.filter) >= 0 && this.toggleColumn(column))
  }

  resetColumns() {
    this.tableService.getColumns({ t: String((new Date).getTime()) })
      .subscribe(columns => this.columns = columns);
  }
}

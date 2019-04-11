import { Component, OnInit } from '@angular/core';

import { ConnectionService } from './connection.service';
import { Connection } from './connection';
import { TableService } from './table.service';
import { Column } from './table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  select: { connection: number; table: string, columns: string[]; edit: boolean; };
  filter: { table: string; column: string; };
  connections: Connection[] = [];
  tables: string[] = [];
  columns: Column[] = [];

  constructor(
    private connectionService: ConnectionService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.resetSelect({}, {});
    this.connectionService.getConnections()
      .subscribe(connections => this.connections = connections);
  }

  resetSelect(select: {[key: string]: any}, filter: {[key: string]: any}) {
    this.select = Object.assign({ connection: -1, table: '', columns: [], edit: false }, select);
    this.filter = Object.assign({ table: '', column: '' }, filter);
  }

  getTables(connection: number, filter: boolean) {
    if (!filter) {
      this.resetSelect({ connection: this.select.connection === connection ? -1 : connection }, {});
      this.tables = [];
    }
    if (connection >= 0) {
      this.tableService.getTables(connection)
        .subscribe(tables => this.tables = tables.filter(table => table.search(this.filter.table) >= 0));
    }
  }

  resetTable(connection: number) {
    this.tables = [];
    this.tableService.refresh(connection);
    this.getTables(this.select.connection, true);
  }

  getColumns(table: string, filter: boolean) {
    if (!filter) {
      const defaults = this.select.table === table ? { table: '', column: '' } : { table, column: this.filter.column };
      this.columns = [];
      this.resetSelect({ connection: this.select.connection, table: defaults.table }, { table: this.filter.table, column: defaults.column });
      this.getTables(this.select.connection, true);
    }
    if (this.select.table) {
      this.tableService.getColumns(this.select.connection, table)
        .subscribe(columns => this.columns = columns.filter(column => column.name.search(this.filter.column) >= 0));
    }
  }

  toggleColumns() {
    this.columns.map(column => this.toggleColumn(column.name));
  }

  toggleColumn(column: string) {
    const index = this.select.columns.indexOf(column);
    if (index < 0) {
      this.select.columns = [... this.select.columns, column];
    } else {
      this.select.columns = this.select.columns.filter(col => col !== column);
    }
  }

  addConnection() {
    this.select.connection = this.connections.length;
    this.select.edit = true;
  }

  saveDatabase() {
    this.connectionService.saveConnection(this.connections)
      .subscribe(_ => this.resetTable(this.select.connection));
  }
}

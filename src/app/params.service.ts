import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { ConnectionService } from './connection.service';
import { TableService } from './table.service';
import { QueryService } from './query.service';
import { Connection } from './connection';
import { Column } from './table';

interface Params {
  connection: Connection;
  tables: string[];
  table: string;
  columns: Column[];
  selected: Column[];
}

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private subject: BehaviorSubject<Params> = new BehaviorSubject({} as Params);
  private params: Params;

  constructor(
    private connectionService: ConnectionService,
    private tableService: TableService,
    private queryService: QueryService
  ) { }

  initParams() {
    this.setParams({ connection: null, tables: [], table: null, columns: [], selected: [] });
  }

  setConnection(index: number, params = {}) {
    const tables = [];
    const table = null;
    const columns = [];
    const selected = [];

    this.connectionService.setConnection(index).subscribe(connection => {
      this.setParams({ connection, tables, table, columns, selected });
      this.tableService.setConnection(index, params).subscribe(tables => {
        this.setParams({ connection, tables, table, columns, selected });
      });
    });
    this.queryService.setConnection(index);
  }

  setTable(table: string, params = {}) {
    this.tableService.setTable(table, params).subscribe(columns => {
      const { connection, tables } = this.params;
      const selected = [];
      this.setParams({ connection, tables, table, columns, selected })
    });
  }

  setParams(params: Params) {
    this.params = params;
    this.subject.next(params);
  }

  toggleColumns() {
    this.params.selected = this.params.columns.filter(column => this.params.selected.indexOf(column) < 0);
    this.setParams(this.params);
  }

  toggleColumn(column: Column) {
    const index = this.params.selected.indexOf(column);

    if (index >= 0) {
      this.params.selected.splice(index, 1);
    } else {
      this.params.selected.push(column);
    }
    this.setParams(this.params);
  }

  checkColumn(column: Column) {
    return this.params.selected.indexOf(column) >= 0;
  }

  getParams(): Observable<Params> {
    return this.subject.asObservable().pipe();
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { Column } from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ApiService {

  private connection: number = null;
  private table: string = null;
  private columns: Column[] = [];

  setConnection(connection: number) {
    this.connection = connection;
    return this;
  }

  getTables(params = {}): Observable<string[]> {
    this.columns = [];

    return this.connection === null ? of(null)
      : this.setTable(null).http.get<string[]>(`/api/tables/${this.connection}`, { params });
  }

  setTable(table: string) {
    this.table = table;
    return this;
  }

  getColumns(params = {}): Observable<Column[]> {
    return this.connection === null || this.table === null ? of(null)
      : this.http.get<Column[]>(`/api/tables/${this.connection}/${this.table}`, { params });
  }

  toggleColumn(column: Column) {
    if (this.checkColumn(column)) {
      this.columns = this.columns.filter(item => item !== column);
    } else {
      this.columns = [...this.columns, column];
    }
    return this.columns;
  }

  checkColumn(column: Column) {
    return this.columns.indexOf(column) >= 0;
  }
}

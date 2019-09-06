import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Column } from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ApiService {

  private connection: number = null;
  private table: string = null;

  setConnection(connection: number, params: {[k: string]: string}): Observable<string[]> {
    this.table = null;
    this.connection = connection;

    return this.http.get<string[]>(`/api/tables/${this.connection}`, params);
  }

  setTable(table: string, params: {[k: string]: string}): Observable<Column[]> {
    this.table = table;

    return this.http.get<Column[]>(`/api/tables/${this.connection}/${this.table}`, params);
  }
}

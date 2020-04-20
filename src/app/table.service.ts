import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Column } from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ApiService {

  private table: string = null;

  getTables(connection: number, params: {[k: string]: string} = {}): Observable<string[]> {
    this.table = null;

    return this.http.get<string[]>(`/api/tables/${connection}`, { params });
  }

  getColumns(connection: number, table: string, params: {[k: string]: string} = {}): Observable<Column[]> {
    this.table = table;

    return this.http.get<Column[]>(`/api/tables/${connection}/${this.table}`, { params });
  }
}

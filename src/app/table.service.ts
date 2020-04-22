import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Column } from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ApiService {

  getTables(connection: number, params: {[k: string]: string} = {}): Observable<string[]> {
    return this.http.get<string[]>(`/api/tables/${connection}`, { params });
  }

  getColumns(connection: number, table: string, params: {[k: string]: string} = {}): Observable<Column[]> {
    return this.http.get<Column[]>(`/api/tables/${connection}/${table}`, { params });
  }
}

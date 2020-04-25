import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

export interface IColumn {
  name: string;
  type: string;
  unsigned: boolean;
  autoincrement: boolean;
  primary: boolean;
  default: any;
  notnull: boolean;
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class TableService extends ApiService {

  getTables(connection: number, params: {[k: string]: string} = {}): Observable<string[]> {
    return this.http.get<string[]>(`/api/tables/${connection}`, { params });
  }

  getColumns(connection: number, table: string, params: {[k: string]: string} = {}): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`/api/tables/${connection}/${table}`, { params });
  }
}

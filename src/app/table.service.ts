import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Column } from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ApiService {

  getTables(index: number): Observable<string[]> {
    return this.http.get<string[]>(`/api/tables/${index}`);
  }

  getColumns(index: number, table: string): Observable<Column[]> {
    return this.http.get<Column[]>(`/api/tables/${index}/${table}`);
  }

  refresh(index: number): void {
    const params = { t: String((new Date).getTime()) };
    this.http.get<string[]>(`/api/tables/${index}`, { params }).subscribe(tables => tables.forEach(table => {
      this.http.get<Column[]>(`/api/tables/${index}/${table}`, { params }).subscribe();
    }));
  }
}

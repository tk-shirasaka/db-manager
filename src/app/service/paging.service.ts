import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';

export interface IData {
  [k: string]: string;
}
export interface IPage {
  data: IData[];
  total: number;
  current_page: number;
  last_page: number;
}

export interface IWhere {
  [k: string]: { column: string; condition: string }[]
}

@Injectable({
  providedIn: 'root'
})
export class PagingService extends ApiService {

  get(connection: number, table: string, page: number, where: IWhere): Observable<IPage> {
    return this.http.post<IPage>(`/api/page/${connection}/${table}?page=${page}`, { where });
  }

  insert(connection: number, table: string, data: IData): Observable<IPage> {
    return this.http.post<IPage>(`/api/page/${connection}/${table}/insert`, { data });
  }

  update(connection: number, table: string, data: IData, where: IWhere): Observable<IPage> {
    return this.http.post<IPage>(`/api/page/${connection}/${table}/update`, { where, data });
  }

  delete(connection: number, table: string, where: IWhere): Observable<IPage> {
    return this.http.post<IPage>(`/api/page/${connection}/${table}/delete`, { where });
  }
}

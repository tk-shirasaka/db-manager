import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';

export interface IData {
  [k: string]: string;
}
export interface IPage {
  data: IData;
}

export interface IWhere {
  [k: string]: { column: string; op: string; value: string }[]
}

@Injectable({
  providedIn: 'root'
})
export class PagingService extends ApiService {

  get(connection: number, table: string, where: IWhere): Observable<IPage> {
    return this.http.post<IPage>(`/api/page/${connection}/${table}`, { where });
  }

  update(connection: number, table: string, data: IData, where: IWhere): Observable<IPage> {
    return this.http.post<IPage>(`/api/page/${connection}/${table}/update`, { where, data });
  }
}

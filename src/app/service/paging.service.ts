import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';

export interface IPage {
  data: { [k: string]: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class PagingService extends ApiService {

  getPage(connection: number, table: string, where: { [k: string]: { column: string; op: string; value: string }[] }): Observable<IPage> {
    return this.http.post<IPage>(`/api/page/${connection}/${table}`, where);
  }
}

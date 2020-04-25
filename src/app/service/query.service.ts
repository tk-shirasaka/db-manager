import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IData, ApiService } from './api.service';

export class Query {
  query: string;
  count: number;
  header: string[];
  history: string[];
  data: IData[];
}

@Injectable({
  providedIn: 'root'
})
export class QueryService extends ApiService {

  execute(connection: number, query: string): Observable<Query> {
    return this.http.post<Query>(`/api/query/${connection}`, { query });
  }
}

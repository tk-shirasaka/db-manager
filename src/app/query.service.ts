import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Result } from './query';

@Injectable({
  providedIn: 'root'
})
export class QueryService extends ApiService {

  private connection: number = null;

  setConnection(connection: number) {
    this.connection = connection;
  }

  execute(query: string): Observable<Result> {
    return this.http.post<Result>(`/api/query/${this.connection}`, { query });
  }
}

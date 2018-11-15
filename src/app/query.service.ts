import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Result } from './query';

@Injectable({
  providedIn: 'root'
})
export class QueryService extends ApiService {

  execute(index: number, query: string): Observable<Result> {
    return this.http.post<Result>(`/api/query/${index}`, { query });
  }
}

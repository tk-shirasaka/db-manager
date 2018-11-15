import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Connections, Connection, FormType } from './connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends ApiService {

  getConnections(): Observable<Connection[]> {
    return this.http.get<Connections>(`/api/connections`).pipe(map(result => result.connections));
  }

  getTypes(): Observable<FormType[]> {
    return this.http.get<Connections>(`/api/connections`).pipe(map(result => result.types));
  }

  saveConnection(data: Connection[]): Observable<Connections> {
    return this.http.post<Connections>(`/api/connections`, data);
  }
}

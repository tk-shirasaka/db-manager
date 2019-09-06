import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Connections, Connection, FormType } from './connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends ApiService {

  private connection: number;

  setConnection(connection: number): Observable<Connection> {
    this.connection = connection;
    return this.getConnections().pipe(map(connections => connections[connection] || new Connection));
  }

  getConnections(): Observable<Connection[]> {
    return this.http.get<Connections>(`/api/connections`).pipe(map(result => result.connections));
  }

  getTypes(): Observable<{[k: string]: FormType}> {
    return this.http.get<Connections>(`/api/connections`).pipe(map(result => result.types));
  }

  saveConnection(connection: Connection) {
    this.getConnections().subscribe(connections => {
      connections[this.connection] = connection;
      this.http.post<Connections>(`/api/connections`, connections.filter(connection => connection)).subscribe(_ => {
        location.reload();
      });
    })
  }
}

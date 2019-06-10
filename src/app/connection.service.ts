import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Connections, Connection, FormType } from './connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends ApiService {

  private connection: number = null;

  getConnections(): Observable<Connection[]> {
    return this
      .setConnection(null)
      .http.get<Connections>(`/api/connections`).pipe(map(result => result.connections));
  }

  setConnection(connection: number) {
    this.connection = connection;
    return this;
  }

  getConnection(): Observable<Connection> {
    return this.connection === null ? of(null)
      : this.http.get<Connections>(`/api/connections`).pipe(map(result => result.connections[this.connection]));
  }

  getTypes(): Observable<{[k: string]: FormType}> {
    return this.http.get<Connections>(`/api/connections`).pipe(map(result => result.types));
  }

  saveConnection(index: number, connection: Connection) {
    this.getConnections().subscribe(connections => {
      connections[index] = connection;
      this.http.post<Connections>(`/api/connections`, connections.filter(connection => connection)).subscribe(_ => {
        location.reload();
      });
    })
  }
}

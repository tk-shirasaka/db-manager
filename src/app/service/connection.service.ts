import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

export class Connection {
  database: string;
  group: number;
  description: string;
  permission: number[];
  [key: string]: any;
}

interface IField {
  name: string;
  type: string;
  value: string;
  label?: string;
}

export class IFormType {
  name: string;
  fields: IField[];
  quote: string[];
}

export interface Connections {
  connections: Connection[];
  types: {[k: string]: IFormType};
}

export const Permissions: string[] = [
  'select',
  'update',
  'insert',
  'delete',
  'alter',
];

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends ApiService {

  private connection: number;

  getConnection(connection: number): Observable<Connection> {
    this.connection = connection;
    return this.getConnections().pipe(map(connections => connections[connection] || new Connection));
  }

  getConnections(): Observable<Connection[]> {
    return this.http.get<Connections>(`/api/connections`).pipe(map(result => result.connections));
  }

  getTypes(): Observable<{[k: string]: IFormType}> {
    return this.http.get<Connections>(`/api/connections`).pipe(map(result => result.types));
  }

  saveConnection(connection: Connection) {
    this.getConnections().subscribe(connections => {
      connections[this.connection] = connection;
      this.http.post<Connections>(`/api/connections`, connections.filter(connection => connection)).subscribe(_ => {
        location.href = connection ? location.href : '/';
      });
    })
  }
}

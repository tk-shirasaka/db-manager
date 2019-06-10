import { Component, OnInit } from '@angular/core';

import { ConnectionService } from '../connection.service';
import { Connection } from '../connection';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  connections: Connection[] = [];
  connection: Connection;
  edit: boolean;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.connectionService.getConnections().subscribe(connections => this.connections = connections);
  }

  addConnection() {
    this.connection = new Connection;
    this.edit = true;
  }
}

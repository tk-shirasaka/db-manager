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
  selected: Connection;
  edit: boolean;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.connectionService.getConnections()
      .subscribe(connections => this.connections = connections);
  }
}

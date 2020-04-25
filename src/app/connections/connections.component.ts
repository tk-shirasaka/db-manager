import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Connection, ConnectionService } from '../service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  group: number;
  connections: Connection[] = [];
  selected: Connection;
  edit: boolean;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
  ) { }

  ngOnInit() {
    this.group = +this.route.snapshot.paramMap.get('group');
    this.connectionService.getConnections()
      .subscribe(connections => this.connections = connections);
  }
}

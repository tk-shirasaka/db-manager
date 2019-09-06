import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParamsService } from '../params.service';
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

  constructor(
    private route: ActivatedRoute,
    private paramsService: ParamsService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit() {
    this.connectionService.getConnections()
      .subscribe(connections => this.connections = connections);
    this.paramsService.getParams()
      .subscribe(params => this.selected = params.connection);
    this.route.children.some(
      (route: ActivatedRoute) => Boolean(this.setConnection(+route.snapshot.paramMap.get('connection')))
    );
  }

  initParams() {
    this.paramsService.initParams();
  }

  setConnection(connection: number, reflesh = false) {
    this.paramsService.setConnection(connection, reflesh ? { t: String((new Date).getTime()) } : {});
  }

  addConnection() {
    this.setConnection(this.connections.length);
    this.edit = true;
  }
}

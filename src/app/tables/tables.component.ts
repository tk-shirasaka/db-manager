import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConnectionService } from '../connection.service';
import { Connection } from '../connection';
import { TableService } from '../table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  connection: Connection;
  tables: string[] = [];
  filter: string;
  edit: boolean;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    const connection = +this.route.snapshot.paramMap.get('connection');

    this.connectionService.setConnection(connection).getConnection()
      .subscribe(connection => this.connection = connection);
    this.tableService.setConnection(connection).getTables()
      .subscribe(tables => this.tables = tables);
  }

  resetTables() {
    this.tableService.getTables({ t: String((new Date).getTime()) })
      .subscribe(tables => this.tables = tables);
  }

  saveConnection() {
    const connection = +this.route.snapshot.paramMap.get('connection');

    this.connectionService.saveConnection(connection, this.connection);
  }
}

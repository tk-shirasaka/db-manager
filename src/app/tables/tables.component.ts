import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParamsService } from '../params.service';
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
  selected: string;
  tables: string[] = [];
  filter: string;
  edit: boolean;

  constructor(
    private route: ActivatedRoute,
    private paramsService: ParamsService,
    private connectionService: ConnectionService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    const connection = +this.route.snapshot.paramMap.get('connection');

    this.paramsService.setConnection(connection);
    this.paramsService.getParams().subscribe(params => {
      this.connection = params.connection;
      this.tables = params.tables;
      this.selected = params.table
    });
    this.route.children.some(
      (route: ActivatedRoute) => Boolean(this.setTable(route.snapshot.paramMap.get('table')))
    );
  }

  setTable(table: string, reflesh = false) {
    this.paramsService.setTable(table, reflesh ? { t: String((new Date).getTime()) } : {});
  }

  toggleColumns() {
    this.paramsService.toggleColumns();
  }

  saveConnection() {
    this.connectionService.saveConnection(this.connection);
  }
}

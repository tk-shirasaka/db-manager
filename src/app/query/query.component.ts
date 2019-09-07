import { Component, OnInit } from '@angular/core';

import { ParamsService } from '../params.service';
import { ConnectionService } from '../connection.service';
import { QueryService } from '../query.service';
import { Permissions } from '../permissions';
import { Connection } from '../connection';
import { Column } from '../table';
import { Result } from '../query';

import 'brace/mode/sql';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  connection: Connection;
  table: string;
  permissions = Permissions;
  queryType = 'select';
  history = 0;
  result: Result = new Result;
  filter: string = '';

  constructor(
    private paramsService: ParamsService,
    private connectionService: ConnectionService,
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.paramsService.getParams().subscribe(params => this.setTemplate(params));
  }

  headers() {
    return this.filter ? this.result.header.filter(header => header.search(this.filter) >= 0) : this.result.header;
  }

  setTemplate(params: {connection: Connection, table: string, selected: Column[]}): void {
    this.connection = params.connection;
    this.table = params.table;
    if (params.table) {
      this.connectionService.getTypes().subscribe(formTypes => {
        const quote = formTypes[params.connection.driver].quote;
        const where = !('query' in this.result) || this.result.query.search(/where/i) < 0 ? 'where' : this.result.query.replace(/^(.|\n)*?where/i, 'where');
        const selected = params.selected.map(col => `${quote[0]}${col.name}${quote[1]}`).join(',\n    ');
        const table = `${quote[0]}${params.table}${quote[1]}`;
        switch (this.queryType) {
          case 'select': this.result.query = `select\n    ${selected}\nfrom ${table}\n${where}`; break;
          case 'update': this.result.query = `update ${table}\nset\n    ${selected}\n${where}`; break;
          case 'insert': this.result.query = `insert into ${table}\n(\n    ${selected}\n)\nvalues\n()`; break;
          case 'delete': this.result.query = `delete from ${table}\n${where}`; break;
          case 'alter' : this.result.query = `alter table ${table}\n${ selected ? 'alter column \n    '+selected : 'add\n' }`; break;
        }
      });
    }
  }

  copy(): void {
    const headers = this.headers();
    const text = this.result.data.map(data => {
      const line: string[] = [];
      headers.forEach(header => line.push(data[header]));
      return line.join('\t');
    }).join('\n');
    navigator.clipboard.writeText(text);
  }

  execute(): void {
    this.queryService.execute(this.result.query)
    .subscribe(result => {
      this.result = result;
      this.history = result.history.length;
    });
  }

  setHistory(offset: number) {
    this.history += offset;
    if ('history' in this.result) {
      this.history = (this.result.history.length + this.history) % this.result.history.length;
      this.result.query = this.result.history[this.history];
    }
  }
}

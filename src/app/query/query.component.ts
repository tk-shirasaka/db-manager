import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConnectionService } from '../connection.service';
import { QueryService } from '../query.service';
import { Permissions } from '../permissions';
import { Connection } from '../connection';
import { Result } from '../query';

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
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
    private queryService: QueryService
  ) { }

  ngOnInit() {
    const connection = +this.route.snapshot.paramMap.get('connection');

    this.connectionService.getConnection(connection)
      .subscribe(connection => this.connection = Object.assign({}, connection));
  }

  headers() {
    return this.filter ? this.result.header.filter(header => header.search(this.filter) >= 0) : this.result.header;
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

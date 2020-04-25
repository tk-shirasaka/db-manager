import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Connection, Query, ConnectionService, QueryService } from '../../service';

@Component({
  selector: 'app-parts-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class PartsQueryComponent implements OnInit {

  connection: Connection;
  table: string;
  queryType = 'select';
  history = 0;
  query: Query = new Query;
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
    return this.filter ? this.query.header.filter(header => header.search(this.filter) >= 0) : this.query.header;
  }

  copy(): void {
    const headers = this.headers();
    const text = this.query.data.map(data => {
      const line: string[] = [];
      headers.forEach(header => line.push(data[header]));
      return line.join('\t');
    }).join('\n');
    navigator.clipboard.writeText(text);
  }

  execute(): void {
    const connection = +this.route.snapshot.paramMap.get('connection');

    this.queryService.execute(connection, this.query.query)
    .subscribe(query => {
      this.query = query;
      this.history = query.history.length;
    });
  }

  setHistory(offset: number) {
    this.history += offset;
    if ('history' in this.query) {
      this.history = (this.query.history.length + this.history) % this.query.history.length;
      this.query.query = this.query.history[this.history];
    }
  }
}

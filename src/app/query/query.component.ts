import { Component, OnChanges, Input } from '@angular/core';

import { ConnectionService } from '../connection.service';
import { QueryService } from '../query.service';
import { Permissions } from '../permissions';
import { Connection } from '../connection';
import { Result } from '../query';

import 'brace/mode/sql';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnChanges {

  @Input() index: number;
  @Input() connection: Connection;
  @Input() table: string;
  @Input() columns: string[];

  permissions = Permissions;
  queryType = 'select';
  history = 0;
  result: Result = new Result;
  quote: string[] = [];

  constructor(
    private connectionService: ConnectionService,
    private queryService: QueryService
  ) { }

  ngOnChanges() {
    this.connectionService.getTypes()
      .subscribe(formTypes => {
        this.quote = formTypes[this.connection.driver].quote;
        this.setTemplate();
      });
  }

  setTemplate(): void {
    if (this.table) {
      const where = !('query' in this.result) || this.result.query.search(/where/i) < 0 ? 'where' : this.result.query.replace(/^(.|\n)*?where/i, 'where');
      const table = `${this.quote[0]}${this.table}${this.quote[1]}`;
      const columns = this.columns.map(col => `${this.quote[0]}${col}${this.quote[1]}`).join(',\n    ');
      switch (this.queryType) {
        case 'select': this.result.query = `select\n    ${columns}\nfrom ${table}\n${where}`; break;
        case 'update': this.result.query = `update ${table}\nset\n    ${columns}\n${where}`; break;
        case 'insert': this.result.query = `insert into ${table}\n(\n    ${columns}\n)\nvalues\n()`; break;
        case 'delete': this.result.query = `delete from ${table}\n${where}`; break;
        case 'alter' : this.result.query = `alter table ${table}\n${ columns ? 'alter column \n    '+columns : 'add\n' }`; break;
      }
    }
  }

  copy(element: HTMLTableElement): void {
    const range = document.createRange();
    const select = window.getSelection();
    select.removeAllRanges();
    range.selectNodeContents(element);
    select.addRange(range);
    document.execCommand('copy');
    select.removeAllRanges();
  }

  execute(): void {
    this.queryService.execute(this.index, this.result.query)
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

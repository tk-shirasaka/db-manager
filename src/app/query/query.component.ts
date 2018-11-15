import { Component, Input } from '@angular/core';

import { Permissions } from '../permissions';
import { Connection } from '../connection';
import { Result } from '../query';
import { QueryService } from '../query.service';

import 'brace/mode/sql';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {

  @Input() index: number;
  @Input() connection: Connection;
  @Input() table: string;
  @Input() columns: string[];

  permissions = Permissions;
  queryType = '';
  history = 0;
  result: Result = new Result;

  constructor(private queryService: QueryService) { }

  setTemplate(): void {
    if (this.table) {
      const columns = this.columns.join(',\n    ');
      switch (this.queryType) {
        case 'select': this.result.query = `select\n    ${columns}\nfrom ${this.table}\nwhere`; break;
        case 'update': this.result.query = `update ${this.table}\nset\n    ${columns}\nwhere`; break;
        case 'insert': this.result.query = `insert into ${this.table}\n(\n    ${columns}\n)\nvalues\n()`; break;
        case 'delete': this.result.query = `delete from ${this.table}\nwhere`; break;
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

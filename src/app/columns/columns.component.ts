import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TableService } from '../table.service';
import { IPage, PagingService } from '../service';
import { Column } from '../table';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  columns: Column[] = [];
  primary: Column[] = [];
  page: IPage;
  filter: string;
  select: string;
  wheres: { [k: string]: { column: string; op: string; value: string; }[] } = {};

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private pagingService: PagingService
  ) { }

  ngOnInit() {
    const { connection, table } = this.route.snapshot.params;

    this.tableService.getColumns(connection, table).subscribe(columns => {
      this.primary = columns.filter(column => column.primary);
      this.columns = columns;
    });
    this.pagingService.getPage(connection, table, this.wheres).subscribe(page => {
      this.page = page;
    });
  }

  selectSearch(column: string) {
    this.select = column;

    if (!(column in this.wheres)) {
      this.wheres[column] = [];
      this.addWhere();
    }
  }

  doneSearch() {
    const { connection, table } = this.route.snapshot.params;

    this.select = '';
    this.pagingService.getPage(connection, table, this.wheres).subscribe(page => {
      this.page = page;
    });
  }

  addWhere() {
    this.wheres[this.select].push({ column: this.select, op: "=", value: "" });
  }
}

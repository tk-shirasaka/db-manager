import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TableService } from '../table.service';
import { IPage, IData, IWhere, PagingService } from '../service';
import { Column } from '../table';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  columns: Column[] = [];
  page: IPage;
  filter: string;
  select: string;
  edit?: { idx: number; data: IData };
  wheres: IWhere = {};

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private pagingService: PagingService
  ) { }

  ngOnInit() {
    const { connection, table } = this.route.snapshot.params;

    this.tableService.getColumns(connection, table).subscribe(columns => {
      this.columns = columns;
    });
    this.pagingService.get(connection, table, this.wheres).subscribe(page => {
      this.page = page;
    });
  }

  selectSearch(e: MouseEvent, column: string) {
    this.select = column;

    if (!this.wheres[column]?.length) {
      this.wheres[column] = [];
      this.addWhere(e);
    }
  }

  doneSearch(e: MouseEvent) {
    const { connection, table } = this.route.snapshot.params;

    this.select = '';
    this.pagingService.get(connection, table, this.wheres).subscribe(page => {
      this.page = page;
    });

    e.preventDefault();
    e.stopPropagation();
  }

  addWhere(e: MouseEvent) {
    this.wheres[this.select].push({ column: this.select, condition: "" });

    e.preventDefault();
    e.stopPropagation();
  }

  deleteWhere(e: MouseEvent, column: string, idx: number) {
    this.wheres[column].splice(idx, 1);
    this.doneSearch(e);
  }

  clearWhere(e: MouseEvent) {
    this.wheres = {};
    this.doneSearch(e);
  }

  selectEdit(idx: number) {
    this.edit = { idx, data: JSON.parse(JSON.stringify(this.page.data[idx])) };
    this.columns.forEach(column => {
      if (column.autoincrement) {
        column.autoincrement && delete(this.edit.data[column.name]);
      } else {
        this.edit.data[column.name] = this.edit.data[column.name] === null ? 'NULL' : `'${this.edit.data[column.name]}'`;
      }
    });
  }

  doneEdit(e: MouseEvent) {
    const { connection, table } = this.route.snapshot.params;
    const { idx, data } = this.edit;
    const wheres = {};

    Object.keys(this.page.data[idx]).forEach(column => {
      wheres[column] = [{ column, condition: this.page.data[idx][column] === null ? 'IS NULL' : `= '${this.page.data[idx][column]}'` }];
    });

    this.pagingService.update(connection, table, data, wheres).subscribe(_ => {
      this.doneSearch(e);
      this.clearEdit(e);
    });
  }

  delete(e: MouseEvent) {
    const { connection, table } = this.route.snapshot.params;
    const { idx } = this.edit;
    const wheres = {};

    Object.keys(this.page.data[idx]).forEach(column => {
      wheres[column] = [{ column, condition: this.page.data[idx][column] === null ? 'IS NULL' : `= '${this.page.data[idx][column]}'` }];
    });

    this.pagingService.delete(connection, table, wheres).subscribe(_ => {
      this.doneSearch(e);
      this.clearEdit(e);
    });
  }

  clearEdit(e: MouseEvent) {
    delete(this.edit);

    e.preventDefault();
    e.stopPropagation();
  }
}

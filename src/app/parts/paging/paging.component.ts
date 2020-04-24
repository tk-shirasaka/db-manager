import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IPage, IData, IWhere, PagingService } from '../../service';
import { Column } from '../../table';

import { PartsDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-parts-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PaartsPagingComponent implements OnInit {

  @Input() columns: Column[];
  @Input() filter: string;

  select: string;
  page: IPage;
  wheres: IWhere = {};
  edit?: { idx: number; data: IData, insert: boolean };

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private pagingService: PagingService,
  ) { }

  ngOnInit() {
    const { connection, table } = this.route.snapshot.params;

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

  insert() {
    const idx = 0;
    this.page.data.unshift({});
    this.edit = { idx, data: {}, insert: true };
  }

  selectEdit(idx: number) {
    this.edit?.insert && this.page.data.shift() && idx--;
    this.edit = { idx, data: JSON.parse(JSON.stringify(this.page.data[idx])), insert: false };
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
    const { idx, data, insert } = this.edit;
    const callback = () => {
        this.doneSearch(e);
        this.clearEdit(e);
    };

    if (insert) {
      this.pagingService.insert(connection, table, data).subscribe(callback);
    } else {
      const wheres = {};

      Object.keys(this.page.data[idx]).forEach(column => {
        wheres[column] = [{ column, condition: this.page.data[idx][column] === null ? 'IS NULL' : `= '${this.page.data[idx][column]}'` }];
      });
      this.pagingService.update(connection, table, data, wheres).subscribe(callback);
    }
  }

  delete(e: MouseEvent) {
    const dialogRef = this.dialog.open(PartsDialogComponent, {
      width: '300px',
      data: { confirm: true, title: '確認', contents: '本当に削除しますか？' },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
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
    });
  }

  clearEdit(e: MouseEvent) {
    delete(this.edit);

    e.preventDefault();
    e.stopPropagation();
  }
}

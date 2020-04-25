import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColumn, TableService } from '../service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  columns: IColumn[] = [];
  filter: string;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
  ) { }

  ngOnInit() {
    const { connection, table } = this.route.snapshot.params;

    this.tableService.getColumns(connection, table).subscribe(columns => {
      this.columns = columns;
    });
  }
}

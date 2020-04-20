import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TableService } from '../table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables: string[] = [];
  filter: string;
  edit: boolean;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService
  ) { }

  ngOnInit() {
    const connection = +this.route.snapshot.paramMap.get('connection');

    this.tableService.getTables(connection).subscribe(tables => {
      this.tables = tables;
    });
  }
}

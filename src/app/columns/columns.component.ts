import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParamsService } from '../params.service';
import { Column } from '../table';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  columns: Column[] = [];
  selected: Column[] = [];
  filter: string;

  constructor(
    private route: ActivatedRoute,
    private paramsService: ParamsService
  ) { }

  ngOnInit() {
    const table = this.route.snapshot.paramMap.get('table');

    this.paramsService.setTable(table);
    this.paramsService.getParams().subscribe(params => {
      this.columns = params.columns;
      this.selected = params.selected;
    });
  }

  checkColumn(column: Column) {
    return this.paramsService.checkColumn(column);
  }

  toggleColumn(column: Column) {
    this.paramsService.toggleColumn(column);
  }
}

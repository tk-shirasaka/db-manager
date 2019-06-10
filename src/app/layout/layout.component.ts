import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Connection } from '../connection';
import { Column } from '../table';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input() connection: Connection;
  @Input() table: string;
  @Input() columns: Column[] = [];
  @Input() edit: boolean;
  @Input() index: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.index) {
      this.index = +this.route.snapshot.paramMap.get('connection');
    }
  }
}

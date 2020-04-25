import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Connection, IFormType, Permissions, ConnectionService } from '../../service';

@Component({
  selector: 'app-parts-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class PartsEditComponent implements OnInit {

  connection: Connection;

  permissions = Permissions;
  formTypes: {[k: string]: IFormType} = {};

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) { }

  ngOnInit() {
    const connection = +this.route.snapshot.paramMap.get('connection');
    const group = +this.route.snapshot.paramMap.get('group');

    this.connectionService.getConnection(connection)
      .subscribe(connection => this.connection = Object.assign({ group }, connection));
    this.connectionService.getTypes()
      .subscribe(formTypes => this.formTypes = formTypes);
  }

  saveConnection(save: boolean): void {
    this.connectionService.saveConnection(save ? this.connection : null);
  }
}
